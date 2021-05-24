/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@material-ui/core';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import MessageHeader from './MessageHeader';
import MessageContent from './MessageContent';
import MessageInput from './MessageInput';
import { SOCKET_URL, APP_ID } from '../../configs';
import websocket from '../../enums/websocket';
import MessageChatStyle from './messageChat.style';
import {
  addMessage,
  updateNluMessage,
  getListMessage,
} from '../../redux/message/actions';
import { apiUpdateResult } from '../../apis/result';
import { STATUS_RESULT, CAMPAIGN_TYPE } from '../../constants/params';
import { getCountMsgConfirm } from '../../apis/message';

const MessageChat = ({
  dataInfoCampaign,
  question,
  confirm,
  dataChatInfo,
  setDataChatInfo,
}) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.arrMessage);
  const { ssoUserId, userId } = useSelector((state) => state.auth);

  const [isTopScroll, setIsTopScroll] = useState(false);
  const [endScroll, setEndScroll] = useState(0);
  const [scrollBottom, setScrollBottom] = useState(0);
  const [msgId, setMsgId] = useState('');

  const [totalMessage] = useState(100);
  const rws = useRef(null);
  const currentDataInfoCampaign = useRef(dataInfoCampaign);
  const currentQuestion = useRef(question);
  const currentConfirm = useRef(confirm);
  const currentMsgId = useRef(msgId);
  const currentDataChatInfoting = useRef(dataChatInfo);

  const sendMessage = async (message) => {
    const msg = {
      type: websocket.types.CHAT,
      appId: APP_ID,
      message: {
        ...message,
        msgId: uuidv4(),
      },
    };
    setMsgId(msg.message.msgId);
    rws.current.send(JSON.stringify(msg));
    dispatch(
      addMessage({
        messageId: msg.message.msgId,
        content: { text: message.text },
        appId: dataInfoCampaign.appId,
        sender: { user: ssoUserId },
        campaignId: dataInfoCampaign.id,
      }),
    );
    setIsTopScroll(false);
    setEndScroll(0);
  };
  const getInfoConfirmMsg = async (intentId) => {
    // Nếu ý định ddax hỏi
    const indexMsgByIntentConfirm = currentConfirm.current.findIndex(
      (item) => item.id === intentId,
    );
    if (indexMsgByIntentConfirm >= 0) {
      const { result } = await getCountMsgConfirm({
        intentId,
        campaignId: currentDataInfoCampaign.current.id,
        ssoUserId,
      });
      if (result) {
        const newConfirm = [...currentConfirm.current];
        newConfirm[indexMsgByIntentConfirm] = {
          ...currentConfirm.current[indexMsgByIntentConfirm],
          ...result,
        };
        setDataChatInfo({
          ...currentDataChatInfoting.current,
          confirm: newConfirm,
        });
      }
    }
  };
  const handleMsgAttachIntent = async ({ intentId }) => {
    // Nếu ý định chưa hỏi
    const msgByIntentQuestion = currentDataChatInfoting.current.question.find(
      (item) => item.id === intentId,
    );
    const arrQuestion = currentDataChatInfoting.current.question.filter(
      (item) => item.id !== intentId,
    );
    if (msgByIntentQuestion) {
      apiUpdateResult({
        campaignId: currentDataInfoCampaign.current.id,
        userId,
        usecaseId:
          currentDataInfoCampaign.current.collectType.toUpperCase() ===
          CAMPAIGN_TYPE.USECASE
            ? currentDataChatInfoting.current.id
            : null,
        type: currentDataInfoCampaign.current.collectType,
        data: {
          id: intentId,
          status: STATUS_RESULT.PROCESSING,
        },
      });
      setDataChatInfo({
        ...currentDataChatInfoting.current,
        question: arrQuestion,
        confirm: [
          ...currentDataChatInfoting.current.confirm,
          { ...msgByIntentQuestion, sumMsgConfirm: 0, sumMsg: 1 },
        ],
      });
    }
    getInfoConfirmMsg(intentId);
  };

  useEffect(() => {
    currentDataInfoCampaign.current = dataInfoCampaign;
    if (dataInfoCampaign.appId) {
      dispatch(
        getListMessage({
          appId: dataInfoCampaign.appId,
          ssoUserId,
          campaignId: dataInfoCampaign.id,
        }),
      );
    }
  }, [dataInfoCampaign]);

  useEffect(() => {
    currentDataChatInfoting.current = dataChatInfo;
  }, [dataChatInfo]);

  useEffect(() => {
    currentQuestion.current = question;
  }, [question]);

  useEffect(() => {
    currentConfirm.current = confirm;
  }, [confirm]);

  useEffect(() => {
    currentMsgId.current = msgId;
  }, [msgId]);

  useEffect(() => {
    rws.current = new WebSocket(SOCKET_URL);
    rws.current.onopen = () => {
      const test = {
        type: 'INIT',
        appId: APP_ID,
        data: {},
      };
      rws.current.send(JSON.stringify(test));
    };
    rws.current.onmessage = (e) => {
      const responseData = JSON.parse(e.data);
      const { type, status, data } = responseData;
      switch (type) {
        case websocket.types.AGENT_INIT:
          break;
        case websocket.types.CHAT:
          if (status) {
            if (currentMsgId.current && data.nlu && data.nlu.intent) {
              const { intent } = data.nlu;
              dispatch(
                updateNluMessage({
                  messageId: currentMsgId.current,
                  nlu: data.nlu.intent,
                }),
              );
              if (intent.intent_id) {
                handleMsgAttachIntent({ intentId: intent.intent_id });
              }
            }
            dispatch(
              addMessage({
                content: data.message,
                messageId: data.msg_id,
                sender: data.sender,
                receiver: {
                  user: ssoUserId,
                },
                appId: currentDataInfoCampaign.current.appId,
                campaignId: currentDataInfoCampaign.current.id,
                nlu: data.nlu && data.nlu.intent ? data.nlu.intent : null,
              }),
            );
            setIsTopScroll(false);
            setEndScroll(0);
            setMsgId('');
          }
          break;
        default:
          break;
      }
    };
  }, []);

  const today = (someDate) => {
    const someday = moment(someDate);
    const day = moment();
    if (someday.format('YYYY-MM-DD') === day.format('YYYY-MM-DD')) {
      return {
        time: someday.format('HH:mm'),
        day: someday.format('DD/MM/YY'),
        fullTime: someday.format('DD/MM/YY, HH:mm'),
      };
    }
    return {
      day: someday.format('DD/MM/YY'),
      fullTime: someday.format('DD/MM/YY, HH:mm'),
    };
  };

  const scrollMessage = async (element) => {
    const { scrollHeight, scrollTop, clientHeight } = element;
    setEndScroll(scrollHeight - scrollTop - clientHeight);
    if (scrollTop === 0 && messages.length < totalMessage) {
      setIsTopScroll(true);
      setScrollBottom(scrollHeight);
    } else {
      setIsTopScroll(false);
    }
  };

  return (
    <MessageChatStyle>
      <Card
        padding={16}
        margin={0}
        className="message-chat box-shadow-standard"
      >
        <MessageHeader dataInfoCampaign={dataInfoCampaign} />
        <MessageContent
          presentUserAvatar="https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG"
          isTopScroll={isTopScroll}
          endScroll={endScroll}
          scrollBottom={scrollBottom}
          today={today}
          scrollMessage={scrollMessage}
          handleSendMessage={sendMessage}
          getInfoConfirmMsg={getInfoConfirmMsg}
        />
        <MessageInput sendMessage={sendMessage} />
      </Card>
    </MessageChatStyle>
  );
};

export default MessageChat;

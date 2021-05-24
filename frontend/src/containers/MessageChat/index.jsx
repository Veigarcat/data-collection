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
import { addMessage } from '../../redux/message/actions';

const MessageChat = ({ dataInfoCampaign }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.arrMessage);
  const { userId } = useSelector((state) => state.auth);

  const [isTopScroll, setIsTopScroll] = useState(false);
  const [endScroll, setEndScroll] = useState(0);
  const [scrollBottom, setScrollBottom] = useState(0);
  // const [accessTokenChat, setAccessTokenChat] = useState('');
  const [totalMessage] = useState(100);

  const rws = useRef(null);

  const sendMessage = async (message) => {
    const msg = {
      type: websocket.types.CHAT,
      appId: APP_ID,
      message: {
        ...message,
        msgId: uuidv4(),
      },
    };
    rws.current.send(JSON.stringify(msg));

    dispatch(
      addMessage({
        messageId: msg.message.msgId,
        content: { text: message.text },
        appId: APP_ID,
        sender: { user: userId },
        campaignId: '604b2371b13db9396ca755c5',
        userId,
      }),
    );
    setIsTopScroll(false);
    setEndScroll(0);
  };

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
          // setAccessTokenChat(responseData.access_token);
          break;
        case websocket.types.CHAT:
          if (status) {
            dispatch(
              addMessage({
                content: data.message,
                messageId: data.msg_id,
                sender: data.sender,
                appId: APP_ID,
                campaignId: '604b2371b13db9396ca755c5',
              }),
            );
            setIsTopScroll(false);
            setEndScroll(0);
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
    console.log('send message', scrollTop, scrollHeight, clientHeight);

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
        />
        <MessageInput sendMessage={sendMessage} />
      </Card>
    </MessageChatStyle>
  );
};

export default MessageChat;

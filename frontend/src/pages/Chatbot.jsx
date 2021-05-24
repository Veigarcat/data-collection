import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MessageChat from '../containers/MessageChat';
import Usecase from '../containers/Usecase';
import Intent from '../containers/Intent';
import { apiGetDataCampaign } from '../apis/campaign';
import { CAMPAIGN_TYPE } from '../constants/params';
import { renderAutoChatInfo } from '../apis/chatInfo';

export default function ChatBot() {
  const { campaignId } = useParams();
  const { userId } = useSelector((state) => state.auth);

  const [dataInfoCampaign, setDataInfoCampaign] = useState({});
  const [dataChatInfo, setDataChatInfo] = useState([]);
  const [confirm, setConfirm] = useState([]);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    apiGetDataCampaign(campaignId)
      .then((res) => {
        setDataInfoCampaign(res.result);
      })
      .catch((e) => {
        console.log(e);
      });
    renderAutoChatInfo({ campaignId, userId })
      .then((res) => {
        setDataChatInfo(res.result);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (dataChatInfo) {
      setConfirm(dataChatInfo.confirm);
      setQuestion(dataChatInfo.question);
    }
  }, [dataChatInfo]);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} ld={6} xl={6}>
          <MessageChat
            dataInfoCampaign={dataInfoCampaign}
            setDataInfoCampaign={setDataInfoCampaign}
            question={question}
            confirm={confirm}
            dataChatInfo={dataChatInfo}
            setDataChatInfo={setDataChatInfo}
          />
        </Grid>
        <Grid item sm={6} ld={6} xl={6} md={6}>
          {dataChatInfo && dataChatInfo.type === CAMPAIGN_TYPE.USECASE && (
            <Usecase
              dataChatInfo={dataChatInfo}
              setDataChatInfo={setDataChatInfo}
              campaignId={campaignId}
              userId={userId}
              campaign={dataInfoCampaign}
              question={question}
              confirm={confirm}
            />
          )}
          {dataChatInfo && dataChatInfo.type === CAMPAIGN_TYPE.INTENT && (
            <Intent
              dataChatInfo={dataChatInfo}
              question={question}
              confirm={confirm}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

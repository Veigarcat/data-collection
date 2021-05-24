import React, { useState, useEffect } from 'react';

import { Typography, Card, Tooltip, Icon, Divider } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ResultUserStyle from './resultUser.style';
import ChartProgress from './ChartProgress';
import StatisticalTable from './StatisticalTable';
import {
  apiStatisticCountUserByCampaignId,
  getDetailResultUserByCampaignId,
} from '../../apis/result';
import { CAMPAIGN_TYPE } from '../../constants/params';

export default function ResultUser() {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [infoCampaign, setInfoCampaign] = useState({
    name: '',
    collectType: '',
  });
  const [arrBox, setArrBox] = useState([]);
  const [statisticDetail, setStatisticDetail] = useState([]);

  useEffect(() => {
    apiStatisticCountUserByCampaignId({ campaignId, userId: userInfo.userId })
      .then((res) => {
        if (res.result) {
          const {
            collectType,
            total,
            totalChat,
            // totalSession,
            totalChatSentence,
            totalCorrectAnswer,
            totalCorrectAnswerConfirm,
            totalBotCorrect,
            totalBotIncorrect,
            totalValidConversation,
            campaign,
          } = res.result;
          setInfoCampaign(campaign);
          setArrBox([
            {
              title:
                collectType.toUpperCase() === CAMPAIGN_TYPE.USECASE
                  ? 'totalUsecase'
                  : 'totalIntent',
              tooltip:
                collectType.toUpperCase() === CAMPAIGN_TYPE.USECASE
                  ? 'totalUsecaseInfo'
                  : 'totalIntentInfo',
              number: total,
            },
            {
              title:
                collectType.toUpperCase() === CAMPAIGN_TYPE.USECASE
                  ? 'totalUsecaseChat'
                  : 'totalIntentChat',
              tooltip:
                collectType.toUpperCase() === CAMPAIGN_TYPE.USECASE
                  ? 'totalUsecaseChatInfo'
                  : 'totalIntentChatInfo',
              number: totalChat,
            },
            // {
            //   title: 'totalSession',
            //   tooltip: 'totalSessionInfo',
            //   number: totalSession,
            // },
            {
              title: 'totalChatSentence',
              tooltip: 'totalChatSentenceInfo',
              number: totalChatSentence,
            },
            {
              title: 'totalCorrectAnswer',
              tooltip: 'totalCorrectAnswerInfo',
              number: totalCorrectAnswer,
            },
            {
              title: 'totalCorrectAnswerConfirm',
              tooltip: 'totalCorrectAnswerConfirmInfo',
              number: totalCorrectAnswerConfirm,
            },
            {
              title: 'totalBotCorrect',
              tooltip: 'totalBotCorrectInfo',
              number: totalBotCorrect,
            },
            {
              title: 'totalBotIncorrect',
              tooltip: 'totalBotIncorrectInfo',
              number: totalBotIncorrect,
            },
            {
              title: 'totalValidConversation',
              tooltip: 'totalValidConversationInfo',
              number: totalValidConversation,
            },
          ]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    getDetailResultUserByCampaignId({ userId: userInfo.userId, campaignId })
      .then((res) => {
        console.log('res', res.result);
        setStatisticDetail(res.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ResultUserStyle>
      <div className="result-user-container">
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          className="title-result-user"
        >
          {t('progressCampaign')}: {infoCampaign.name}
        </Typography>
        <div className="general-information">
          <Typography
            gutterBottom
            variant="h6"
            component="h5"
            className="title-general-information"
          >
            {t('generalInformation')}
          </Typography>
          <div className="container-box">
            {arrBox &&
              arrBox.map((item, index) => (
                <Card className={`card addonBefore_${index + 1}`}>
                  <div className="wrapperCard">
                    <div className="countBox">
                      <div className="title">
                        <Typography variant="h5">{t(item.title)}</Typography>
                        <Tooltip title={t(item.tooltip)}>
                          <Icon className="infoIcon" fontSize="small">
                            info
                          </Icon>
                        </Tooltip>
                      </div>
                    </div>
                    <Divider className="divider" />
                    <div className="countBox">
                      <Typography variant="h5"> {item.number}</Typography>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
        <div className="chart-progress">
          <ChartProgress />
        </div>
        <div className="statistical-table">
          <StatisticalTable
            statisticDetail={statisticDetail}
            collectType={infoCampaign.collectType}
          />
        </div>
      </div>
    </ResultUserStyle>
  );
}

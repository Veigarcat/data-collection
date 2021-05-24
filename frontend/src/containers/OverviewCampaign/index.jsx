import React, { useEffect, useState } from 'react';
import { Typography, Card, Divider, Tooltip, Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import OverviewCampaignStyle from './overviewCampaign.style';
import { apiStatisticCountUserOverView } from '../../apis/result';

export default function OverviewCampaign() {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const [dataOverview, setDataOverView] = useState([]);

  useEffect(() => {
    apiStatisticCountUserOverView({ userId: userInfo.userId })
      .then((res) => {
        if (res.result) {
          const {
            totalCampaign,
            runningCampaign,
            upcomingCampaign,
            finishCampaign,
            totalUsecase,
            totalUsecaseChat,
            totalIntent,
            totalIntentChat,
            totalMessage,
          } = res.result;
          setDataOverView([
            {
              title: 'totalCampaign',
              tooltip: 'totalCampaignInfo',
              number: totalCampaign,
            },
            {
              title: 'runningCampaign',
              tooltip: 'runningCampaignInfo',
              number: runningCampaign,
            },
            {
              title: 'upcomingCampaign',
              tooltip: 'upcomingCampaignInfo',
              number: upcomingCampaign,
            },
            {
              title: 'finishCampaign',
              tooltip: 'finishCampaignInfo',
              number: finishCampaign,
            },
            {
              title: 'totalUsecase',
              tooltip: 'totalUsecaseInfo',
              number: totalUsecase,
            },
            {
              title: 'totalUsecaseChat',
              tooltip: 'totalUsecaseChatInfo',
              number: totalUsecaseChat,
            },
            {
              title: 'totalIntent',
              tooltip: 'totalIntentInfo',
              number: totalIntent,
            },
            {
              title: 'totalIntentChat',
              tooltip: 'totalIntentChatInfo',
              number: totalIntentChat,
            },
            {
              title: 'totalMessage',
              tooltip: 'totalMessageInfo',
              number: totalMessage,
            },
          ]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <OverviewCampaignStyle>
      <div className="overview-campaign-container">
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          className="overview-campaign-title"
        >
          {t('generalInformationCampaign')}
        </Typography>
        <div className="container-box">
          {dataOverview &&
            dataOverview.map((item, index) => (
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
    </OverviewCampaignStyle>
  );
}

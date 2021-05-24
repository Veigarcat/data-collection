import React from 'react';

import { Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  userJoinCampaign,
  userLeaveCampaign,
} from '../../redux/campaign/actions';
import routes from '../../constants/route';

// eslint-disable-next-line consistent-return
export const ShowSelectButton = ({ data, history }) => {
  const {
    messageObject,
    messageType,
    campaignId,
    status: statusCampaign,
    participant,
  } = data;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { email } = useSelector((state) => state.auth);
  const statusJoin = participant.findIndex(
    (parItem) => parItem.email === email,
  );
  const handleUserJoinCampaign = () => {
    dispatch(userJoinCampaign({ campaignId, email }));
  };
  const handleUserLeaveCampaign = () => {
    dispatch(userLeaveCampaign({ campaignId, email }));
  };
  const handleContinue = () => {
    if (messageObject === 'bot' && messageType === 'msg_text') {
      history.push(`/home/${campaignId}/604b13555d214f0efc57428d/chatbot`);
    }
    // if (messageObject === 'human' && messageType === 'msg_voice') {
    //   history.push(`/campaign-manage`);
    // }
    // TODO: kiểm tra loại chiến dịch
  };
  if (
    statusJoin < 0 &&
    statusCampaign !== 'stop' &&
    statusCampaign !== 'pause'
  ) {
    return (
      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          className="button button-participate"
          onClick={() => handleUserJoinCampaign()}
        >
          {t('participate')}
        </Button>
      </div>
    );
  }
  if (
    statusJoin < 0 &&
    (statusCampaign === 'stop' || statusCampaign === 'pause')
  ) {
    return <div className="button-container" />;
  }
  if (statusJoin >= 0) {
    switch (statusCampaign) {
      case 'waiting':
        return (
          <div className="text-warning">
            <Typography gutterBottom variant="body1">
              Chiến dịch chưa bắt đầu, chờ chiến dịch bắt đầu
            </Typography>
          </div>
        );
      case 'running':
        return (
          <div className="button-container">
            <Button
              variant="contained"
              color="primary"
              className="button button-continue"
              onClick={handleContinue}
            >
              {t('continue')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="button button-exit"
              onClick={() => handleUserLeaveCampaign()}
            >
              {t('exit')}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="button button-progress"
              onClick={() => history.push(`/${data.campaignId}/result-user`)}
            >
              {t('progress')}
            </Button>
          </div>
        );
      default:
        return (
          <div className="button-container">
            <Button
              variant="contained"
              color="secondary"
              className="button button-progress"
              onClick={() => history.push(`${routes.RESULT_USER}`)}
            >
              {t('progress')}
            </Button>
          </div>
        );
    }
  }
};

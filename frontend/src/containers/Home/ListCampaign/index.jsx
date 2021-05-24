import React, { useEffect, useState } from 'react';

import {
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  CardContent,
  CardActions,
  Link,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ListCampaignStyle from './listCampaign.style';
import { filterCampaign } from '../../../redux/campaign/actions';
import {
  userJoinCampaign,
  userLeaveCampaign,
  handleAcceptInvite,
  userLeaveCampaignSuccess,
} from '../../../redux/user/actions';
import { convertStatus } from '../../Convert';
import {
  STATUS_USER_CAMPAIGN,
  PAGE_CAMPAIGN_TYPE,
} from '../../../constants/params';
import { getChangeListMsg } from '../../../redux/message/actions';

export default function ListCampaign(props) {
  const { history, search, page, setPage, type } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    listCampaign,
    isLoadingListCampaign,
    totalPages,
    limitPage,
  } = useSelector((state) => state.campaign);
  const { isInviteSuccess, isLeaveSuccess, isJoinSuccess } = useSelector(
    (state) => state.user,
  );
  const { userId } = useSelector((state) => state.auth);
  const [messageObjectState, setMessageObjectState] = useState();
  const [messageTypeState, setMessageTypeState] = useState();
  const [campaignIdState, setCampaignIdState] = useState();
  const [statusCampaign, setStatusCampaign] = useState();
  const [collectTypeState, setCollectTypeState] = useState();
  const handleChangePagination = (e, value) => {
    setPage(value);
    if (type) {
      dispatch(
        filterCampaign({
          ...search,
          participantStatus: type,
          page: value,
          records: limitPage,
          userId,
        }),
      );
    } else {
      dispatch(
        filterCampaign({
          ...search,
          page: value,
          records: limitPage,
          userId,
        }),
      );
    }
  };
  useEffect(() => {
    if (type) {
      dispatch(
        filterCampaign({
          ...search,
          participantStatus: type,
          page,
          records: limitPage,
          userId,
        }),
      );
    } else {
      dispatch(
        filterCampaign({
          ...search,
          page,
          records: limitPage,
          userId,
        }),
      );
    }

    if (isInviteSuccess) {
      if (
        messageObjectState === 'bot' &&
        messageTypeState === 'msg_text' &&
        statusCampaign === 'running'
      ) {
        history.push(`/home/${campaignIdState}/chatbot`);
      } else if (
        messageTypeState === 'msg_voice' &&
        messageObjectState === 'human' &&
        statusCampaign === 'running' &&
        collectTypeState === 'usecase'
      ) {
        history.push('/asr');
      } else if (
        messageTypeState === 'msg_voice' &&
        messageObjectState === 'human' &&
        statusCampaign === 'running' &&
        collectTypeState === 'intent'
      ) {
        history.push('/slu/home');
      }
    }
    if (isLeaveSuccess) {
      dispatch(userLeaveCampaignSuccess(false));
    }
    if (isJoinSuccess) {
      if (
        messageObjectState === 'bot' &&
        messageTypeState === 'msg_text' &&
        statusCampaign === 'running'
      ) {
        history.push(`/home/${campaignIdState}/chatbot`);
      } else if (
        messageTypeState === 'msg_voice' &&
        messageObjectState === 'human' &&
        statusCampaign === 'running' &&
        collectTypeState === 'usecase'
      ) {
        history.push('/asr');
      } else if (
        messageTypeState === 'msg_voice' &&
        messageObjectState === 'human' &&
        statusCampaign === 'running' &&
        collectTypeState === 'intent'
      ) {
        history.push('/slu/home');
      }
    }
  }, [
    isInviteSuccess,
    isLeaveSuccess,
    isJoinSuccess,
    messageObjectState,
    messageTypeState,
    campaignIdState,
    statusCampaign,
    type,
  ]);
  useEffect(() => {
    dispatch(getChangeListMsg());
  }, []);

  // eslint-disable-next-line consistent-return
  const showSelect = (data) => {
    const {
      // campaignName,
      messageObject,
      messageType,
      campaignId,
      status,
      participant,
      collectType,
    } = data;
    const statusJoin = participant.find((parItem) => parItem.userId === userId);
    const handleUserJoinCampaign = () => {
      setStatusCampaign(status);
      setMessageObjectState(messageObject);
      setMessageTypeState(messageType);
      setCampaignIdState(campaignId);
      setCollectTypeState(collectType);
      dispatch(userJoinCampaign({ campaignId, userId }));
    };
    const handleUserLeaveCampaign = () => {
      dispatch(userLeaveCampaign({ campaignId, userId }));
    };
    const handleContinue = () => {
      if (messageObject === 'bot' && messageType === 'msg_text') {
        history.push(`/home/${campaignId}/chatbot`);
      }
      // if (messageObject === 'human' && messageType === 'msg_voice') {
      //   history.push(`/campaign-manage`);
      // }
      // TODO: kiểm tra loại chiến dịch
      if (
        messageType === 'msg_voice' &&
        messageObject === 'human' &&
        collectType === 'intent'
      ) {
        history.push(`/slu/home`);
      }
      if (
        messageType === 'msg_voice' &&
        messageObject === 'human' &&
        collectType === 'usecase'
      ) {
        history.push('/asr');
      }
      // if (messageObject === 'human' && messageType === 'msg_audio') {
      //   history.push(`/slu/home`);
      // }
    };
    const onChangeAcceptInvite = () => {
      setStatusCampaign(status);
      setMessageObjectState(messageObject);
      setMessageTypeState(messageType);
      setCampaignIdState(campaignId);
      setCollectTypeState(collectType);
      dispatch(handleAcceptInvite({ campaignId, userId }));
    };
    if (!statusJoin && (status === 'waiting' || status === 'running')) {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            className="button button-participate"
            onClick={() => handleUserJoinCampaign()}
          >
            {t('participate')}
          </Button>
        </>
      );
    }
    if (!statusJoin && (status === 'stop' || status === 'pause')) {
      return <div className="button-container" />;
    }
    if (
      statusJoin &&
      statusJoin.status === STATUS_USER_CAMPAIGN.NOMINATION &&
      (status === 'waiting' || status === 'running')
    ) {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            className="button button-participate"
            onClick={() => onChangeAcceptInvite()}
          >
            Chấp nhận lời mời
          </Button>
        </>
      );
    }
    if (statusJoin && statusJoin.status === STATUS_USER_CAMPAIGN.JOIN) {
      switch (status) {
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
            <>
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
                onClick={() =>
                  history.push({
                    pathname: `/${data.campaignId}/result-user`,
                  })
                }
              >
                {t('progress')}
              </Button>
            </>
          );
        default:
          return (
            <Button
              variant="contained"
              color="secondary"
              className="button button-progress"
              onClick={() =>
                history.push({
                  pathname: `/${data.campaignId}/result-user`,
                })
              }
            >
              {t('progress')}
            </Button>
          );
      }
    }
  };
  return (
    <ListCampaignStyle>
      <div className="list-campaign-container">
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          className="title-list-campaign"
        >
          {type === PAGE_CAMPAIGN_TYPE.TOTAL && t('listCampaign')}
          {type === PAGE_CAMPAIGN_TYPE.MY_CAMPAIGN && t('myCampaignTitle')}
          {type === PAGE_CAMPAIGN_TYPE.OTHER_CAMPAIGN &&
            t('otherCampaignTitle')}
        </Typography>
        <Grid container spacing={2}>
          {listCampaign.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={6} lg={4} xl={3}>
              <Card className="card">
                <CardMedia
                  className="card-media"
                  image="https://infofinance.vn/wp-content/uploads/2020/01/cach-huy-dich-vu-sms-chu-dong-cua-vietcombank.png"
                  title="Image title"
                />
                <CardContent>
                  <Typography
                    className="name-campaign"
                    variant="h6"
                    component="h6"
                  >
                    {item.name.toUpperCase() === 'SLU' ? (
                      <Link href="/slu/home">{item.name}</Link>
                    ) : (
                      <Link href={`/home/${item.id}/info-campaign`}>
                        {item.name}
                      </Link>
                    )}
                    {/* <Link href={`/home/${item.id}/info-campaign`}>
                      {item.name}
                    </Link> */}
                  </Typography>
                  <div className="status-time-info">
                    <Typography variant="body1">
                      {t('status')} : {convertStatus(item.status)}
                    </Typography>
                    <Typography variant="body1">
                      {`${t('time')}: ${
                        item.timeStart &&
                        Moment(item.timeStart).format('DD/MM/YYYY')
                      } -  ${
                        item.timeStart &&
                        Moment(item.timeEnd).format('DD/MM/YYYY')
                      }
                      `}
                    </Typography>
                    <Typography variant="body1">
                      {t('messageType')}: {t(item.messageType)}
                    </Typography>
                    <Typography variant="body1">
                      {t('messageObject')}: {t(item.messageObject)}
                    </Typography>
                    <Typography variant="body1">
                      {t('collectType')}: {t(item.collectType)}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions className="card-action-container">
                  {showSelect({
                    campaignName: item.name,
                    campaignId: item.id,
                    messageObject: item.messageObject,
                    messageType: item.messageType,
                    status: item.status,
                    participant: item.participant,
                    collectType: item.collectType,
                  })}
                </CardActions>
              </Card>
            </Grid>
          ))}
          {listCampaign.length === 0 && !isLoadingListCampaign && (
            <div className="noData">
              <Typography variant="body1">{t('noData')}</Typography>
            </div>
          )}
        </Grid>
        {isLoadingListCampaign && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )}
        {!isLoadingListCampaign && (
          <Pagination
            className="pagination"
            page={page}
            count={totalPages}
            onChange={handleChangePagination}
          />
        )}
      </div>
    </ListCampaignStyle>
  );
}

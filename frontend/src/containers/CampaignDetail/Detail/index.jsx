/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import {
  Typography,
  Button,
  CardMedia,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { Editor } from 'react-draft-wysiwyg';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'moment';
import { convertFromRaw, EditorState } from 'draft-js';
import DetailStyle from './detail.style';
import { convertStatus } from '../../Convert';
import {
  userJoinCampaign,
  userLeaveCampaign,
  handleAcceptInvite,
  userLeaveCampaignSuccess,
} from '../../../redux/user/actions';
import routes from '../../../constants/route';
import { apiGetDataCampaign } from '../../../apis/campaign';
import { LIST_INTENT, STATUS_USER_CAMPAIGN } from '../../../constants/params';

export default function Detail({ history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const { isInviteSuccess, isLeaveSuccess, isJoinSuccess } = useSelector(
    (state) => state.user,
  );
  const [dataInfoCampaign, setDataInfoCampaign] = useState({});
  const [dataUsecaseCampaign, setDataUsecaseCampaign] = useState([]);
  const [dataIntentCampaign, setDataIntentCampaign] = useState([]);
  const [editorState, setEditorState] = useState();
  const { userId } = useSelector((state) => state.auth);
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    apiGetDataCampaign(campaignId)
      .then((res) => {
        setDataInfoCampaign(res.result);
        const { usecaseList, intentList } = res.result;
        if (usecaseList) {
          const usecaseListNew = usecaseList.reduce((accUC, curUC) => {
            const intentListNew = curUC.intentList.reduce((accIT, curIT) => {
              const intentExist = LIST_INTENT.find(
                (itemIntent) => itemIntent.id === curIT.id,
              );
              if (intentExist) {
                return [
                  ...accIT,
                  {
                    ...curIT,
                    ...intentExist,
                  },
                ];
              }
              return accIT;
            }, []);
            return [
              ...accUC,
              {
                ...curUC,
                intentList: intentListNew,
              },
            ];
          }, []);
          setDataUsecaseCampaign(usecaseListNew);
        }
        if (intentList) {
          const intentListNew = intentList.reduce((accIT, curIT) => {
            const intentExist = LIST_INTENT.find(
              (itemIntent) => itemIntent.id === curIT.id,
            );
            if (intentExist) {
              return [
                ...accIT,
                {
                  ...curIT,
                  ...intentExist,
                },
              ];
            }
            return accIT;
          }, []);
          setDataIntentCampaign(intentListNew);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    if (isInviteSuccess) {
      if (
        dataInfoCampaign.messageObject === 'bot' &&
        dataInfoCampaign.messageType === 'msg_text'
      ) {
        history.push(`/home/${campaignId}/chatbot`);
      } else if (
        dataInfoCampaign.messageType === 'msg_voice' &&
        dataInfoCampaign.messageObject === 'human' &&
        dataInfoCampaign.collectType === 'usecase'
      ) {
        console.log(dataInfoCampaign);
        history.push('/asr');
      } else if (
        dataInfoCampaign.messageType === 'msg_voice' &&
        dataInfoCampaign.messageObject === 'human' &&
        dataInfoCampaign.collectType === 'intent'
      ) {
        console.log(dataInfoCampaign);
        history.push('/slu/home');
      }
    }
    if (isLeaveSuccess) {
      dispatch(userLeaveCampaignSuccess(false));
    }
    if (isJoinSuccess) {
      if (
        dataInfoCampaign.messageObject === 'bot' &&
        dataInfoCampaign.messageType === 'msg_text'
      ) {
        history.push(`/home/${campaignId}/chatbot`);
      } else if (
        dataInfoCampaign.messageType === 'msg_voice' &&
        dataInfoCampaign.messageObject === 'human' &&
        dataInfoCampaign.collectType === 'usecase'
      ) {
        history.push('/asr');
      } else if (
        dataInfoCampaign.messageType === 'msg_voice' &&
        dataInfoCampaign.messageObject === 'human' &&
        dataInfoCampaign.collectType === 'intent'
      ) {
        history.push('/slu/home');
      }
    }
  }, [isInviteSuccess, isLeaveSuccess, isJoinSuccess]);
  useEffect(() => {
    if (dataInfoCampaign.desc) {
      const campaignDesc = EditorState.createWithContent(
        convertFromRaw(JSON.parse(dataInfoCampaign.desc)),
      );
      setEditorState(campaignDesc);
    }
  }, [dataInfoCampaign]);

  const handleUserJoinCampaign = () => {
    dispatch(userJoinCampaign({ campaignId, userId }));
  };
  const handleUserLeaveCampaign = () => {
    dispatch(userLeaveCampaign({ campaignId, userId }));
  };
  const onChangeAcceptInvite = () => {
    dispatch(handleAcceptInvite({ campaignId, userId }));
  };
  const handleContinue = () => {
    if (
      dataInfoCampaign.messageObject === 'bot' &&
      dataInfoCampaign.messageType === 'msg_text'
    ) {
      history.push(`/home/${campaignId}/chatbot`);
    }
    if (
      dataInfoCampaign.messageType === 'msg_voice' &&
      dataInfoCampaign.messageObject === 'human' &&
      dataInfoCampaign.collectType === 'intent'
    ) {
      history.push(`/slu/home`);
    }
    if (
      dataInfoCampaign.messageType === 'msg_voice' &&
      dataInfoCampaign.messageObject === 'human' &&
      dataInfoCampaign.collectType === 'usecase'
    ) {
      history.push('/asr');
    }
  };
  const showSelectButton = ({ campaignParticipant, campaignStatus }) => {
    return (
      <>
        {!campaignParticipant &&
          (campaignStatus === 'waiting' || campaignStatus === 'running') && (
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
          )}
        {campaignParticipant &&
          campaignParticipant.status === STATUS_USER_CAMPAIGN.NOMINATION &&
          (campaignStatus === 'waiting' || campaignStatus === 'running') && (
            <Button
              variant="contained"
              color="primary"
              className="button button-participate"
              onClick={() => onChangeAcceptInvite()}
            >
              {t('acceptInvite')}
            </Button>
          )}
        {campaignParticipant &&
          campaignParticipant.status === STATUS_USER_CAMPAIGN.JOIN &&
          campaignStatus === 'running' && (
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
                onClick={() => history.push(`/${campaignId}/result-user`)}
              >
                {t('progress')}
              </Button>
            </div>
          )}
        {campaignParticipant &&
          campaignParticipant.status === STATUS_USER_CAMPAIGN.JOIN &&
          campaignStatus === 'waiting' && (
            <div className="text-warning">
              <Typography gutterBottom variant="body1">
                {t('campaignHasNotStart')}
              </Typography>
            </div>
          )}
        {campaignParticipant &&
          campaignParticipant.status === STATUS_USER_CAMPAIGN.JOIN &&
          (campaignStatus === 'stop' || campaignStatus === 'pause') && (
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
          )}
      </>
    );
  };
  if (Object.keys(dataInfoCampaign).length === 0) {
    return (
      <div className="loader-view" align="center">
        <CircularProgress />
      </div>
    );
  }
  if (Object.keys(dataInfoCampaign).length !== 0) {
    const participant = dataInfoCampaign.participant.find(
      (parItem) => parItem.userId === userId,
    );
    return (
      <DetailStyle>
        <Card className="info-campaign-container">
          <Typography
            gutterBottom
            variant="h5"
            component="h6"
            className="title-info-campaign"
          >
            {dataInfoCampaign.name}
          </Typography>
          <div className="campaign-wrapper">
            <Grid container>
              <Grid item xs={5} sm={5}>
                <CardMedia
                  className="image-campaign"
                  component="img"
                  alt="Contemplative Reptile"
                  image="https://infofinance.vn/wp-content/uploads/2020/01/cach-huy-dich-vu-sms-chu-dong-cua-vietcombank.png"
                  title={dataInfoCampaign.name}
                />
              </Grid>
              <Grid item xs={7} sm={7}>
                <div className="time-info">
                  <Typography variant="body1" gutterBottom>
                    {t('status')} : {convertStatus(dataInfoCampaign.status)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {`${t('timeStart')}: ${
                      dataInfoCampaign.timeStart
                        ? Moment(dataInfoCampaign.timeStart).format(
                            'DD/MM/YYYY',
                          )
                        : t('noInfo')
                    }`}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {`${t('timeEnd')}: ${
                      dataInfoCampaign.timeStart
                        ? Moment(dataInfoCampaign.timeEnd).format('DD/MM/YYYY')
                        : t('noInfo')
                    }`}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {t('messageType')}: {t(dataInfoCampaign.messageType)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {t('messageObject')}: {t(dataInfoCampaign.messageObject)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {t('collectType')}: {t(dataInfoCampaign.collectType)}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <div className="campaign-content">
              <Accordion
                className="accordion-time"
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Typography> {t('description')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Editor
                    toolbarHidden
                    editorState={editorState}
                    readOnly="true"
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion
                className="accordion-criteria"
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Typography> {t('scoreMethod')}</Typography>
                </AccordionSummary>
                {dataInfoCampaign.criteria &&
                  dataInfoCampaign.criteria.map((criteria) => (
                    <AccordionDetails key={criteria.id}>
                      <Typography variant="body1" className="intent-title">
                        {`${criteria.name}: ${criteria.point} ${t('score')}`}
                      </Typography>
                    </AccordionDetails>
                  ))}
                {!dataInfoCampaign.criteria && (
                  <AccordionDetails>
                    <Typography variant="body1" gutterBottom>
                      {t('noScore')}
                    </Typography>
                  </AccordionDetails>
                )}
              </Accordion>
              <Accordion
                className={
                  dataUsecaseCampaign.length > 0
                    ? 'accordion-usecases'
                    : 'display-none'
                }
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Typography>{t('usecases')}</Typography>
                </AccordionSummary>
                {dataUsecaseCampaign.map((usecase) => (
                  <AccordionDetails
                    style={{ boxShadow: 'none' }}
                    key={usecase.id}
                  >
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                      >
                        <Typography>{usecase.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="grid-title">
                          <Typography>{`${t('situations')}:`}</Typography>
                        </div>
                        <div className="grid-content">
                          <Typography className="content-usecase">
                            {usecase.desc}
                          </Typography>
                        </div>
                      </AccordionDetails>
                      <AccordionDetails>
                        <Typography>{`${t('intents')}:`}</Typography>
                      </AccordionDetails>
                      {usecase.intentList &&
                        usecase.intentList.map((intent) => (
                          <AccordionDetails key={intent.id}>
                            <Typography className="intent-title">
                              {intent.displayName}
                            </Typography>
                          </AccordionDetails>
                        ))}
                    </Accordion>
                  </AccordionDetails>
                ))}
              </Accordion>
              {dataIntentCampaign && (
                <Accordion
                  className={
                    dataIntentCampaign.length > 0
                      ? 'accordion-usecases'
                      : 'display-none'
                  }
                  expanded={expanded === 'panel4'}
                  onChange={handleChange('panel4')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <Typography>{t('intent')}</Typography>
                  </AccordionSummary>
                  {dataIntentCampaign.map((intent) => (
                    <AccordionDetails key={intent.id}>
                      <Typography className="intent-title">
                        {intent.name}
                      </Typography>
                    </AccordionDetails>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
          <div className="footer-container">
            <div className="button-functions">
              {showSelectButton({
                campaignParticipant: participant,
                campaignStatus: dataInfoCampaign.status,
              })}
            </div>
          </div>
        </Card>
      </DetailStyle>
    );
  }
}

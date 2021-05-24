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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import CampaignDetailStyle from './campaignDetail.style';
import { apiGetDataCampaign } from '../../apis/campaign';
import { apiGetListUsecase } from '../../apis/usecase';

export default function CampaignDetail(props) {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const { history } = props;
  const [dataInfoCampaign, setDataInfoCampaign] = useState({});
  const [dataUsecaseCampaign, setDataUsecaseCampaign] = useState([]);
  const calculateStatus = (timeStart, timeEnd) => {
    const now = Moment();
    if (timeStart && timeEnd) {
      if (now.isBefore(timeStart)) {
        return 1;
      }
      if (now.isAfter(timeStart) && now.isBefore(timeEnd)) {
        return 2;
      }
      if (now.isAfter(timeEnd)) {
        return 3;
      }
    }
    return 0;
  };
  const showStatus = (status) => {
    switch (status) {
      case 1:
        return 'Sắp diễn ra';
      case 2:
        return 'Đang diễn ra';
      case 3:
        return 'Đã kết thúc';
      default:
        return 'Chưa đủ thông tin';
    }
  };
  useEffect(() => {
    apiGetDataCampaign(campaignId)
      .then((res) => {
        setDataInfoCampaign(res.result);
        if (res.result.usecaseList.length !== 0) {
          apiGetListUsecase(res.result.usecaseList)
            .then((resUsecase) => {
              setDataUsecaseCampaign(resUsecase.listUsecase);
            })
            .catch((e) => {
              console.log(e);
            }, []);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  if (!dataInfoCampaign) {
    return (
      <CampaignDetailStyle>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
          className="no-data-info-campaign"
        >
          {t('nodata')}
        </Typography>
      </CampaignDetailStyle>
    );
  }
  return (
    <CampaignDetailStyle>
      <Card className="info-campaign-container">
        <Typography
          gutterBottom
          variant="h3"
          component="h3"
          className="title-info-campaign"
        >
          {dataInfoCampaign.name}
        </Typography>
        <div className="campaign-wrapper">
          <CardMedia
            className="image-campaign"
            component="img"
            alt="Contemplative Reptile"
            image="https://infofinance.vn/wp-content/uploads/2020/01/cach-huy-dich-vu-sms-chu-dong-cua-vietcombank.png"
            title="Ảnh của chiến dịch"
          />
          <Typography gutterBottom className="description-info-campaign">
            {dataInfoCampaign.desc}
          </Typography>
          <div className="campaign-content">
            <Accordion className="accordion-time">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography> {t('time')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" gutterBottom>
                  {`${t('status')}: ${showStatus(
                    calculateStatus(
                      dataInfoCampaign.timeStart,
                      dataInfoCampaign.timeEnd,
                    ),
                  )}`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1" gutterBottom>
                  {`${t('timeStart')}: ${
                    dataInfoCampaign.timeStart
                      ? Moment(dataInfoCampaign.timeStart).format(
                          'DD/MM/YYYY, HH:mm',
                        )
                      : 'Chưa có thông tin'
                  }`}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1" gutterBottom>
                  {`${t('timeEnd')}: ${
                    dataInfoCampaign.timeStart
                      ? Moment(dataInfoCampaign.timeEnd).format(
                          'DD/MM/YYYY, HH:mm',
                        )
                      : 'Chưa có thông tin'
                  }`}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="accordion-criteria">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography> {t('score')}</Typography>
              </AccordionSummary>
              {dataInfoCampaign.scores &&
                dataInfoCampaign.scores.map((score) => (
                  <AccordionDetails key={score.criteria}>
                    <Typography variant="body1" gutterBottom>
                      {`${score.criteria}: ${score.point} điểm`}
                    </Typography>
                  </AccordionDetails>
                ))}
              {!dataInfoCampaign.scores && (
                <AccordionDetails>
                  <Typography variant="body1" gutterBottom>
                    Chiến dịch không tính điểm
                  </Typography>
                </AccordionDetails>
              )}
            </Accordion>
            <Accordion className="accordion-usecases">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>{t('usecases')}</Typography>
              </AccordionSummary>
              {dataUsecaseCampaign &&
                dataUsecaseCampaign.map((usecase) => (
                  // eslint-disable-next-line no-underscore-dangle
                  <AccordionDetails key={usecase._id}>
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
                      {usecase.intents &&
                        usecase.intents.map((intent) => (
                          <AccordionDetails key={intent.title}>
                            <Typography className="intent-title">
                              {intent.title}
                            </Typography>
                          </AccordionDetails>
                        ))}
                    </Accordion>
                  </AccordionDetails>
                ))}
            </Accordion>
          </div>
        </div>

        <div className="button-functions">
          <Button
            variant="contained"
            color="primary"
            className="button button-participate"
          >
            {t('participate')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="button button-continue"
            onClick={() => history.push('/chatbot')}
          >
            {t('continue')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="button button-exit"
          >
            {t('exit')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="button button-progress"
          >
            {t('progress')}
          </Button>
        </div>
      </Card>
    </CampaignDetailStyle>
  );
}

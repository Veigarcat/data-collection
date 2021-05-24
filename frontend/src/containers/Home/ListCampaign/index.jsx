import React, { useEffect } from 'react';

import {
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Link,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ListCampaignStyle from './listCampaign.style';
import {
  userJoinCampaign,
  userLeaveCampaign,
  filterCampaign,
} from '../../../redux/campaign/actions';
import routes from '../../../constants/route';

const calculateStatus = (timeStart, timeEnd) => {
  const now = Moment();
  if (timeStart && timeEnd) {
    if (now.isBefore(timeStart)) {
      return 'upcoming';
    }
    if (now.isAfter(timeStart) && now.isBefore(timeEnd)) {
      return 'happening';
    }
    if (now.isAfter(timeEnd)) {
      return 'finished';
    }
  }
  return 'total';
};
const showStatus = (status) => {
  switch (status) {
    case 'happening' || 'upcoming':
      return 'Đang diễn ra';
    case 'finished':
      return 'Đã kết thúc';
    default:
      return 'Chưa nhập đủ thông tin';
  }
};

export default function ListCampaign(props) {
  const { history, search, page, setPage } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    listCampaign,
    isLoadingListCampaign,
    totalPages,
    limitPage,
  } = useSelector((state) => state.campaign);
  // const { userId } = useSelector((state) => state.auth);

  const handleChangePagination = (e, value) => {
    setPage(value);
    // dispatch(fetchAllCampaigns({ page: value, records: limitPage }));
    dispatch(
      filterCampaign({
        ...search,
        page: value,
        records: limitPage,
        userId: '603dff7f2f72d931f0606a17',
      }),
    );
  };
  useEffect(() => {
    dispatch(
      filterCampaign({
        ...search,
        page,
        records: limitPage,
        userId: '603dff7f2f72d931f0606a17',
      }),
    );
  }, []);

  // eslint-disable-next-line consistent-return
  const showSelect = (statusJoin, statusCampaign, data) => {
    const handleUserJoinCampaign = () => {
      dispatch(userJoinCampaign(data));
    };
    const handleUserLeaveCampaign = () => {
      dispatch(userLeaveCampaign(data));
    };
    if (!statusJoin && statusCampaign !== 3) {
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
    if (statusJoin) {
      switch (statusCampaign) {
        case 'upcoming':
          return (
            <div className="text-warning">
              <Typography gutterBottom variant="body1">
                Chiến dịch chưa bắt đầu, chờ chiến dịch bắt đầu
              </Typography>
            </div>
          );
        case 'happening':
          return (
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                className="button button-continue"
                onClick={() =>
                  history.push(
                    `/home/${data.campaignId}/${data.usecaseId}/chatbot`,
                  )
                }
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
  return (
    <ListCampaignStyle>
      <div className="list-campaign-container">
        <Typography
          gutterBottom
          variant="h3"
          component="h3"
          className="title-list-campaign"
        >
          {t('listCampaign')}
        </Typography>
        {listCampaign &&
          listCampaign.map((item) => (
            <Card className="campaign-item" key={item.id}>
              <Grid container>
                <Grid item xs={4} sm={4}>
                  <CardMedia
                    className="image-campaign"
                    component="img"
                    alt="Contemplative Reptile"
                    image="https://infofinance.vn/wp-content/uploads/2020/01/cach-huy-dich-vu-sms-chu-dong-cua-vietcombank.png"
                    title="Ảnh của chiến dịch"
                  />
                </Grid>
                <Grid item xs={8} sm={8} className="content-campaign">
                  <Typography className="name-campaign">
                    <Link href={`/home/${item.id}/info-campaign`}>
                      {item.name}
                    </Link>
                  </Typography>
                  <div className="bonus-info">
                    <div className="status-time-info">
                      <Typography gutterBottom variant="body1">
                        {t('status')} :{' '}
                        {showStatus(
                          calculateStatus(item.timeStart, item.timeEnd),
                        )}
                      </Typography>
                      <Typography gutterBottom variant="body1">
                        {t('typeMessage')}: {t(item.typeMessage)}
                      </Typography>
                      <Typography gutterBottom variant="body1">
                        {t('object')}: {t(item.objectMessage)}
                      </Typography>
                    </div>
                    <div className="participant-info">
                      <Typography gutterBottom variant="body1">
                        {t('amountParticipant')}: {item.userId.length}
                      </Typography>
                    </div>
                  </div>
                  {showSelect(
                    item.userId.includes('603dff7f2f72d931f0606a17'),
                    calculateStatus(item.timeStart, item.timeEnd),
                    {
                      campaignId: item.id,
                      userId: '603dff7f2f72d931f0606a17',
                      usecaseId: item.usecaseList[0],
                    },
                  )}
                </Grid>
              </Grid>
            </Card>
          ))}
        {isLoadingListCampaign && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )}
        <Pagination
          page={page}
          count={totalPages}
          onChange={handleChangePagination}
        />
      </div>
    </ListCampaignStyle>
  );
}

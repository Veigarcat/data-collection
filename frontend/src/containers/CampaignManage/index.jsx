import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import CampaignManageStyle from './campaignManage.style';
import CampaignList from './CampaignList';
import CampaignSearch from './CampaignSearch';
import { toastSuccess } from '../../commons/Toastify';
import {
  filterCampaign,
  fetchHandleCampaignSuccess,
} from '../../redux/campaign/actions';

export default function CampaignManage({ history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    totalPages,
    limitPage,
    isLoadingListCampaign,
    listCampaign,
    notiHandleCampaignSuccess,
  } = useSelector((state) => state.campaign);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    key: '',
    status: 'total',
    messageType: 'total',
    messageObject: 'total',
    scope: 'total',
    collectType: 'total',
  });

  useEffect(() => {
    dispatch(
      filterCampaign({
        ...search,
        page,
        records: limitPage,
      }),
    );
  }, []);

  const handleChangePagination = (e, value) => {
    // console.log(value);
    setPage(value);
    dispatch(
      filterCampaign({
        ...search,
        page: value,
        records: limitPage,
      }),
    );
  };
  const handleConvertAddCampaign = () => {
    history.push('/campaign/create/step-1');
  };
  useEffect(() => {
    if (notiHandleCampaignSuccess) {
      toastSuccess('Xóa chiến dịch thành công');
      dispatch(fetchHandleCampaignSuccess(false));
      dispatch(
        filterCampaign({
          ...search,
          page,
          records: limitPage,
        }),
      );
    }
  }, [notiHandleCampaignSuccess]);
  return (
    <CampaignManageStyle>
      <Paper className="campaign-manage-container">
        <div className="header">
          <Typography variant="h4" className="headTitle">
            {t('campaignManage')}
          </Typography>
          <div className="headButtons">
            <AddCircleOutlineIcon
              color="primary"
              className="icon"
              onClick={handleConvertAddCampaign}
            />
            <Typography
              className="text-icon"
              onClick={handleConvertAddCampaign}
            >
              Thêm chiến dịch
            </Typography>
          </div>
        </div>
        <div className="search-campaign">
          <CampaignSearch
            search={search}
            setSearch={setSearch}
            setPage={setPage}
          />
        </div>
        <CampaignList
          isLoadingListCampaign={isLoadingListCampaign}
          listCampaign={listCampaign}
          history={history}
          search={search}
          limitPage={limitPage}
          page={page}
          setPage={setPage}
        />
        <div className="pagination">
          <Pagination
            page={page}
            count={totalPages}
            onChange={handleChangePagination}
          />
        </div>
      </Paper>
    </CampaignManageStyle>
  );
}

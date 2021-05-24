import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import UserManageStyle from './userManage.style';
import UserList from './UserList';
import UserSearch from './UserSearch';
import { filterUser } from '../../redux/user/actions';
import { REGISTER_DOMAIN } from '../../configs';

export default function UserManage({ history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { totalPages, limitPage, isLoadingListUser, listUser } = useSelector(
    (state) => state.user,
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    key: '',
    status: 'total',
  });

  useEffect(() => {
    dispatch(
      filterUser({
        ...search,
        page,
        records: limitPage,
      }),
    );
  }, []);

  const handleChangePagination = (e, value) => {
    setPage(value);
    dispatch(
      filterUser({
        ...search,
        page: value,
        records: limitPage,
      }),
    );
  };

  const handleAddUser = () => {
    window.location.assign(`${REGISTER_DOMAIN}${window.location.pathname}`);
  };
  return (
    <UserManageStyle>
      <Paper className="campaign-manage-container">
        <div className="header">
          <Typography variant="h4" className="headTitle">
            {t('userManage')}
          </Typography>
          <div className="headButtons">
            <AddCircleOutlineIcon
              color="primary"
              className="icon"
              onClick={handleAddUser}
            />
            <Typography className="text-icon" onClick={handleAddUser}>
              {t('userAdd')}
            </Typography>
          </div>
        </div>
        <div className="search-campaign">
          <UserSearch search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <UserList
          isLoadingListUser={isLoadingListUser}
          listUser={listUser}
          history={history}
          search={search}
          limitPage={limitPage}
          page={page}
        />
        <div className="pagination">
          <Pagination
            page={page}
            count={totalPages}
            onChange={handleChangePagination}
          />
        </div>
      </Paper>
    </UserManageStyle>
  );
}

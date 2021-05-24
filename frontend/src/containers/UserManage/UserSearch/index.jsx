import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  InputAdornment,
  Icon,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import UserSearchStyle from './userSearch.style';
import { filterUser } from '../../../redux/user/actions';
import { USER_STATUS } from '../../../constants/params';

export default function UserSearch({ search, setSearch, setPage }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { limitPage } = useSelector((state) => state.campaign);
  const onChangeSearch = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setPage(1);
    dispatch(
      filterUser({
        ...search,
        [e.target.name]: e.target.value,
        page: 1,
        records: limitPage,
      }),
    );
  };
  const onChangeKeySearch = (e) => {
    e.persist();
    setSearch((prev) => ({
      ...prev,
      key: e.target.value,
    }));
  };
  const handleKeyPress = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      dispatch(
        filterUser({
          ...search,
          page: 1,
          records: limitPage,
        }),
      );
      setPage(1);
    }
  };
  const handleSearch = () => {
    setPage(1);
    dispatch(
      filterUser({
        ...search,
        page: 1,
        records: limitPage,
      }),
    );
  };
  return (
    <UserSearchStyle>
      <div className="campaign-search-container">
        <div className="search">
          <TextField
            value={search.key}
            onChange={onChangeKeySearch}
            onKeyDown={handleKeyPress}
            variant="outlined"
            className="searchInput"
            placeholder={t('search')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="search-icon" onClick={handleSearch}>
                    search
                  </Icon>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <FormControl variant="outlined" className="search-information">
          <InputLabel>{t('status')}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label={t('status')}
            name="status"
            value={search.status}
            onChange={onChangeSearch}
          >
            <MenuItem value={USER_STATUS.TOTAL}>{t('total')}</MenuItem>
            <MenuItem value={USER_STATUS.ACTIVE}>{t('active')}</MenuItem>
            <MenuItem value={USER_STATUS.DEACTIVATE}>
              {t('deactivate')}
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </UserSearchStyle>
  );
}

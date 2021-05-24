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
import CampaignSearchStyle from './campaignSearch.style';
import { filterCampaign } from '../../../redux/campaign/actions';

export default function CampaignSearch({ search, setSearch, setPage }) {
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
      filterCampaign({
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
        filterCampaign({
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
      filterCampaign({
        ...search,
        page: 1,
        records: limitPage,
      }),
    );
  };
  return (
    <CampaignSearchStyle>
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
          <InputLabel>{t('scopeCampaign')}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label={t('scopeCampaign')}
            name="scope"
            value={search.scope}
            onChange={onChangeSearch}
          >
            <MenuItem value="total">{t('total')}</MenuItem>
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="search-information">
          <InputLabel>{t('status')}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="status"
            label={t('status')}
            value={search.status}
            onChange={onChangeSearch}
          >
            <MenuItem value="total">{t('total')}</MenuItem>
            <MenuItem value="waiting">{t('waiting')}</MenuItem>
            <MenuItem value="running">{t('running')}</MenuItem>
            <MenuItem value="finished">{t('finished')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="search-information">
          <InputLabel>{t('collectType')}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="collectType"
            label={t('collectType')}
            value={search.collectType}
            onChange={onChangeSearch}
          >
            <MenuItem value="total">{t('total')}</MenuItem>
            <MenuItem value="usecase">{t('usecase')}</MenuItem>
            <MenuItem value="intent">{t('intent')}</MenuItem>
            <MenuItem value="topic">{t('topic')}</MenuItem>
            <MenuItem value="free">{t('free')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="search-information">
          <InputLabel>{t('messageType')}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="messageType"
            label={t('messageType')}
            value={search.messageType}
            onChange={onChangeSearch}
          >
            <MenuItem value="total">{t('total')}</MenuItem>
            <MenuItem value="msg_text">{t('msg_text')}</MenuItem>
            <MenuItem value="msg_voice">{t('msg_voice')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="search-information">
          <InputLabel>{t('messageObject')}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="messageObject"
            label={t('messageObject')}
            value={search.messageObject}
            onChange={onChangeSearch}
          >
            <MenuItem value="total">{t('total')}</MenuItem>
            <MenuItem value="bot">{t('bot')}</MenuItem>
            <MenuItem value="human">{t('human')}</MenuItem>
          </Select>
        </FormControl>
      </div>
    </CampaignSearchStyle>
  );
}

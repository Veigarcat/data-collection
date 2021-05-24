import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {
  Card,
  InputBase,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import Moment from 'moment';
import { DateTimePicker } from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toastMsgError } from '../../../commons/Toastify';
import SearchCampaignStyle from './searchCampaign.style';
import { filterCampaign } from '../../../redux/campaign/actions';

export default function SearchCampaign({ search, setSearch, setPage }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const { userId } = useSelector((state) => state.auth);
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
        userId: '603dff7f2f72d931f0606a17',
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
          userId: '603dff7f2f72d931f0606a17',
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
        userId: '603dff7f2f72d931f0606a17',
        page: 1,
        records: limitPage,
      }),
    );
  };
  const onChangeTimeEnd = (date) => {
    if (Moment(date).isAfter(search.timeStart)) {
      setSearch((prev) => ({
        ...prev,
        timeEnd: date,
      }));
      dispatch(
        filterCampaign({
          ...search,
          timeEnd: date,
          page: 1,
          records: limitPage,
          userId: '603dff7f2f72d931f0606a17',
        }),
      );
    } else {
      toastMsgError(t('invalidDate'));
    }
  };
  const onChangeTimeStart = (date) => {
    if (Moment(date).isBefore(search.timeEnd)) {
      setSearch((prev) => ({
        ...prev,
        timeStart: date,
      }));
      dispatch(
        filterCampaign({
          ...search,
          timeStart: date,
          page: 1,
          records: limitPage,
          userId: '603dff7f2f72d931f0606a17',
        }),
      );
    } else {
      toastMsgError(t('invalidDate'));
    }
  };
  return (
    <SearchCampaignStyle>
      <div className="search-campaign-container">
        <div className="search">
          <div className="search-icon">
            <SearchIcon color="primary" onClick={handleSearch} />
          </div>
          <InputBase
            className="input-search"
            placeholder={t('search')}
            inputProps={{ 'aria-label': 'search' }}
            name="key"
            value={search.key}
            onChange={onChangeKeySearch}
            onKeyDown={handleKeyPress}
          />
        </div>
        <Card className="filter search-category">
          <FormControl component="fieldset">
            <FormLabel className="title-filter cat-campaign">
              {t('catCampaign')}
            </FormLabel>
            <RadioGroup
              aria-label="typeCampaign"
              name="typeCampaign"
              value={search.typeCampaign}
              onChange={onChangeSearch}
            >
              <FormControlLabel
                value="total"
                control={<Radio />}
                label={t('total')}
              />
              <FormControlLabel
                value="myCampaign"
                control={<Radio />}
                label={t('myCampaign')}
              />
              <FormControlLabel
                value="otherCampaign"
                control={<Radio />}
                label={t('otherCampaign')}
              />
            </RadioGroup>
          </FormControl>
        </Card>
        <Card className="filter search-status">
          <FormControl component="fieldset">
            <FormLabel className="title-filter status-campaign">
              {t('statusCampaign')}
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="status"
              value={search.status}
              onChange={onChangeSearch}
            >
              <FormControlLabel
                value="total"
                control={<Radio />}
                label={t('total')}
              />
              <FormControlLabel
                value="happening"
                control={<Radio />}
                label={t('happening')}
              />
              <FormControlLabel
                value="finished"
                control={<Radio />}
                label={t('finished')}
              />
            </RadioGroup>
          </FormControl>
        </Card>
        <Card className="filter search-status">
          <FormControl component="fieldset">
            <FormLabel className="title-filter status-campaign">
              {t('typeMessage')}
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="typeMessage"
              value={search.typeMessage}
              onChange={onChangeSearch}
            >
              <FormControlLabel
                value="total"
                control={<Radio />}
                label={t('total')}
              />
              <FormControlLabel
                value="text"
                control={<Radio />}
                label={t('text')}
              />
              <FormControlLabel
                value="speech"
                control={<Radio />}
                label={t('speech')}
              />
            </RadioGroup>
          </FormControl>
        </Card>
        <Card className="filter search-status">
          <FormControl component="fieldset">
            <FormLabel className="title-filter status-campaign">
              {t('objectMessage')}
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="objectMessage"
              value={search.objectMessage}
              onChange={onChangeSearch}
            >
              <FormControlLabel
                value="total"
                control={<Radio />}
                label={t('total')}
              />
              <FormControlLabel
                value="bot"
                control={<Radio />}
                label={t('bot')}
              />
              <FormControlLabel
                value="human"
                control={<Radio />}
                label={t('human')}
              />
            </RadioGroup>
          </FormControl>
        </Card>
        <Card className="filter search-datetime">
          <DateTimePicker
            inputVariant="outlined"
            margin="normal"
            label={t('to')}
            format="yyyy-MM-dd"
            value={search.timeStart}
            onChange={(date) => onChangeTimeStart(date)}
            className="datetime"
            cancelLabel={t('cancel')}
            okLabel={t('ok')}
          />
          <DateTimePicker
            inputVariant="outlined"
            margin="normal"
            label={t('from')}
            format="yyyy-MM-dd"
            value={search.timeEnd}
            className="datetime"
            onChange={(date) => onChangeTimeEnd(date)}
            cancelLabel={t('cancel')}
            okLabel={t('ok')}
          />
        </Card>
      </div>
    </SearchCampaignStyle>
  );
}

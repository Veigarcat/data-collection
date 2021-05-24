import React from 'react';
import {
  Card,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SearchCampaignStyle from './searchCampaign.style';
import { filterCampaign } from '../../../redux/campaign/actions';

export default function SearchCampaign({ search, setSearch, setPage }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
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
        userId,
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
          userId,
          page: 1,
          records: limitPage,
        }),
      );
      setPage(1);
    }
  };
  return (
    <SearchCampaignStyle>
      <div className="search-campaign-container">
        <div className="search">
          <TextField
            label={t('search')}
            id="outlined-start-adornment"
            variant="outlined"
            className="input-search"
            name="key"
            value={search.key}
            onChange={onChangeKeySearch}
            onKeyDown={handleKeyPress}
          />
        </div>
        <hr />
        <Card className="filter search-category">
          <FormControl component="fieldset">
            <FormLabel className="title-filter cat-campaign">
              {t('catCampaign')}
            </FormLabel>
            <RadioGroup
              className="radio-group"
              aria-label="participantStatus"
              name="participantStatus"
              value={search.participantStatus}
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
        <hr />
        <Card className="filter search-status">
          <FormControl component="fieldset">
            <FormLabel className="title-filter status-campaign">
              {t('statusCampaign')}
            </FormLabel>
            <RadioGroup
              className="radio-group"
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
                value="waiting"
                control={<Radio />}
                label={t('waiting')}
              />
              <FormControlLabel
                value="running"
                control={<Radio />}
                label={t('running')}
              />
              <FormControlLabel
                value="finished"
                control={<Radio />}
                label={t('finished')}
              />
            </RadioGroup>
          </FormControl>
        </Card>
        <hr />
        <Card className="filter search-status">
          <FormControl component="fieldset">
            <FormLabel className="title-filter status-campaign">
              {t('messageType')}
            </FormLabel>
            <RadioGroup
              className="radio-group"
              aria-label="gender"
              name="messageType"
              value={search.messageType}
              onChange={onChangeSearch}
            >
              <FormControlLabel
                value="total"
                control={<Radio />}
                label={t('total')}
              />
              <FormControlLabel
                value="msg_text"
                control={<Radio />}
                label={t('msg_text')}
              />
              <FormControlLabel
                value="msg_voice"
                control={<Radio />}
                label={t('msg_voice')}
              />
            </RadioGroup>
          </FormControl>
        </Card>
        <hr />
        <Card className="filter search-status">
          <FormControl component="fieldset">
            <FormLabel className="title-filter status-campaign">
              {t('messageObject')}
            </FormLabel>
            <RadioGroup
              className="radio-group"
              aria-label="gender"
              name="messageObject"
              value={search.messageObject}
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
      </div>
    </SearchCampaignStyle>
  );
}

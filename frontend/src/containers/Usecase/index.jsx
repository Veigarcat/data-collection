/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import {
  Card,
  Typography,
  Grid,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Badge,
  Divider,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import UsecaseStyle from './usecase.style';
import { apiGetUsecase } from '../../apis/usecase';

export default function Usecase() {
  const { usecaseId } = useParams();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dataUsecase, setDataUsecase] = useState({});
  const [arrDiscussion, setArrDiscussion] = useState([]);
  const [arrSubmit, setArrSubmit] = useState([]);
  const options = [
    'Thông tin Usecase ABC',
    'Thông tin Usecase ABC1',
    'Thông tin Usecase ABC2',
    'Thông tin Usecase ABC3',
    'Thông tin Usecase ABC4',
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    apiGetUsecase(usecaseId)
      .then((res) => {
        console.log(res);
        setDataUsecase(res.result.usecase);
        setArrDiscussion(res.result.arrDiscussion);
        setArrSubmit(res.result.arrSubmit);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <UsecaseStyle>
      <div className="usecase box-shadow-standard">
        <Card className="title-usecase">
          <Typography variant="h4" component="h2">
            {dataUsecase.name}
          </Typography>
        </Card>
        <Divider />
        <div className="desc-usecase">
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            className="title-desc-usecase"
          >
            {t('descUsecase')}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            className="detail-desc-usecase"
          >
            {t('situations')}:
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            className="detail-desc-usecase"
          >
            {dataUsecase.desc}
          </Typography>
        </div>
        <Divider />
        <div className="intent discussion">
          <Typography
            variant="h6"
            component="h6"
            className="intent-title title-discussion"
          >
            {t('intentDiscussion')} (Tổng: {arrDiscussion.length})
          </Typography>
          <div className="intent-detail detail-discussion">
            {arrDiscussion.map((item, index) => (
              <Grid container key={item.title} className="discussion-container">
                <Grid item xs={8} sm={8}>
                  <Typography gutterBottom variant="body1">
                    {index + 1} . {item.title}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className="number-detail">
                  <Tooltip title="Tổng số câu đã trao đổi" placement="top">
                    <Badge badgeContent="2" color="primary">
                      <MailIcon />
                    </Badge>
                  </Tooltip>
                  <Tooltip
                    title="Tổng số câu người dùng đã xác nhận "
                    placement="top"
                  >
                    <Badge badgeContent="2" color="primary">
                      <FavoriteIcon color="secondary" />
                    </Badge>
                  </Tooltip>
                </Grid>
              </Grid>
            ))}
          </div>
        </div>
        <Divider />
        <div className="intent question">
          <Typography
            variant="h6"
            component="h6"
            className="intent-title title-question"
          >
            {t('intentQuestion')} (Tổng: {arrSubmit.length})
          </Typography>
          <div className="intent-detail detail-question">
            {arrSubmit.map((item, index) => (
              <Typography
                gutterBottom
                variant="body1"
                key={item.title}
                className="item-question"
              >
                {index + 1} . {item.title}
              </Typography>
            ))}
          </div>
        </div>
        <div className="footer-usecase">
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleClick}
          >
            {t('convertUsecase')}
          </Button>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === 'Pyxis'}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Button variant="contained" color="secondary" className="button">
            {t('endUsecase')}
          </Button>
        </div>
      </div>
    </UsecaseStyle>
  );
}

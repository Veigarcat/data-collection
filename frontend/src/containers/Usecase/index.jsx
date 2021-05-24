/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import {
  Typography,
  Grid,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
  Divider,
  Paper,
  Tabs,
  Tab,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { useTranslation } from 'react-i18next';
import UsecaseStyle from './usecase.style';
import {
  getListUsecaseNeedChat,
  getInfoUsecaseById,
} from '../../apis/chatInfo';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1} className="tab-panel">
          {children}
        </Box>
      )}
    </div>
  );
}

const titleTable = [
  'Kịch bản',
  'Câu chat',
  'Bot đoán đúng',
  'Bot đoán sai',
  'Đã xác nhận',
];

export default function Usecase({
  campaign,
  dataChatInfo,
  campaignId,
  userId,
  setDataChatInfo,
  question,
  confirm,
}) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [listConvertUsecase, setListConvertUsecase] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleConvertUsecase = ({ ucId }) => {
    setAnchorEl(null);
    getInfoUsecaseById({ campaignId, userId, usecaseId: ucId })
      .then((res) => {
        const { status, result } = res;
        if (status === 1) {
          setDataChatInfo(result);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (dataChatInfo.id) {
      getListUsecaseNeedChat({
        campaignId,
        userId,
        usecaseId: dataChatInfo.id,
      })
        .then((res) => {
          const { status, result } = res;
          if (status === 1) {
            setListConvertUsecase(result);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [dataChatInfo]);

  return (
    <UsecaseStyle>
      <Paper className="usecase">
        <Tabs
          indicatorColor="primary"
          // textColor="primary"
          value={value}
          onChange={handleChange}
          className="header"
        >
          <Tab label="Kịch bản" {...a11yProps(0)} />
          <Tab label="Tiến độ" {...a11yProps(1)} />
          <Button
            variant="contained"
            className="button-convert"
            onClick={handleClick}
          >
            <span className="text-button">{t('convertUsecase')}</span>
            <SwapHorizIcon />
          </Button>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {listConvertUsecase &&
              listConvertUsecase.map((usecaseItem) => (
                <MenuItem
                  key={usecaseItem.id}
                  value={usecaseItem.id}
                  onClick={() =>
                    handleConvertUsecase({
                      ucId: usecaseItem.id,
                    })
                  }
                >
                  {usecaseItem.name}
                </MenuItem>
              ))}
          </Menu>
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          {dataChatInfo && (
            <>
              <div className="content-main">
                <div className="desc-usecase">
                  <Typography
                    variant="h6"
                    component="h6"
                    className="title-usecase"
                  >
                    {dataChatInfo.name}
                  </Typography>
                  <Typography variant="body1" className="detail-desc-usecase">
                    {t('situations')}:
                  </Typography>
                  <Typography variant="body1" className="detail-desc-usecase">
                    {dataChatInfo.desc}
                  </Typography>
                </div>
                <Divider />
                <div className="intent discussion">
                  <Typography
                    variant="h6"
                    component="h6"
                    className="intent-title title-discussion"
                  >
                    {t('intentDiscussion')} (Tổng: {confirm && confirm.length})
                  </Typography>
                  <div className="intent-detail detail-discussion">
                    {confirm &&
                      confirm.map((item, index) => (
                        <Grid
                          container
                          key={item.displayName}
                          className="discussion-container"
                        >
                          <Grid item xs={8} sm={8}>
                            <Typography gutterBottom variant="body1">
                              {index + 1} . {item.displayName}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sm={4} className="number-detail">
                            <Tooltip
                              title="Tổng số câu đã trao đổi"
                              placement="top"
                            >
                              <Badge
                                badgeContent={item.sumMsg || '0'}
                                color="primary"
                              >
                                <MailIcon />
                              </Badge>
                            </Tooltip>
                            <Tooltip
                              title="Tổng số câu người dùng đã xác nhận "
                              placement="top"
                            >
                              <Badge
                                badgeContent={item.sumMsgConfirm || '0'}
                                color="primary"
                              >
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
                    {t('intentQuestion')} (Tổng: {question && question.length})
                  </Typography>
                  <div className="intent-detail detail-question">
                    {question &&
                      question.map((item, index) => (
                        <Typography
                          gutterBottom
                          variant="body1"
                          key={item.title}
                          className="item-question"
                        >
                          {index + 1} . {item.displayName}
                        </Typography>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="table-container">
            <TableContainer>
              <Table aria-label="customized table">
                <TableHead className="table-header">
                  <TableRow>
                    {titleTable.map((item) => (
                      <TableCell key={item} align="center">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaign.usecaseList &&
                    campaign.usecaseList.map((usecase, index) => (
                      <TableRow
                        key={usecase.id}
                        className={
                          index % 2 === 0 ? 'table-row' : 'table-row-sole'
                        }
                      >
                        <TableCell component="th" scope="row">
                          {usecase.name}
                        </TableCell>
                        <TableCell align="center">11</TableCell>
                        <TableCell align="center">11</TableCell>
                        <TableCell align="center">11</TableCell>
                        <TableCell align="center">11</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </TabPanel>
      </Paper>
    </UsecaseStyle>
  );
}

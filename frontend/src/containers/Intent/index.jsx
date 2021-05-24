import React from 'react';

import {
  Typography,
  Grid,
  Tooltip,
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
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useTranslation } from 'react-i18next';
import IntentStyle from './intent.style';

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
  'Ý định',
  'Câu chat',
  'Bot đoán đúng',
  'Bot đoán sai',
  'Đã xác nhận',
];

export default function Intent({ confirm, question }) {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <IntentStyle>
      <Paper className="intent-chat-container">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Ý định" {...a11yProps(0)} />
          <Tab label="Tiến độ" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="content-main">
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="table-container">
            <TableContainer>
              <Table aria-label="customized table">
                <TableHead className="table-header">
                  <TableRow>
                    {titleTable.map((item) => (
                      <TableCell key={item}>{item}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {confirm &&
                    confirm.map((row, index) => (
                      <TableRow
                        key={row.name}
                        className={
                          index % 2 === 0 ? 'table-row' : 'table-row-sole'
                        }
                      >
                        <TableCell component="th" scope="row">
                          {row.displayName}
                        </TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell align="center">0</TableCell>
                      </TableRow>
                    ))}
                  {question &&
                    question.map((row, index) => (
                      <TableRow
                        key={row.name}
                        className={
                          index % 2 === 0 ? 'table-row' : 'table-row-sole'
                        }
                      >
                        <TableCell component="th" scope="row">
                          {row.displayName}
                        </TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell align="center">0</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </TabPanel>
      </Paper>
    </IntentStyle>
  );
}

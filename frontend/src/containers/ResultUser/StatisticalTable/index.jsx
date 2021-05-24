import React, { useState, useEffect } from 'react';

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useTranslation } from 'react-i18next';
import StatisticalTableStyle from './statisticalTable.style';

export default function StatisticalTable({ statisticDetail, collectType }) {
  const { t } = useTranslation();
  const [menuState, setMenuState] = useState([]);
  const titleTable = [
    {
      title: 'STT',
      tooltip: 'STT',
    },
    {
      title: collectType,
      tooltip: collectType,
    },
    {
      title: 'totalChatSentence',
      tooltip: 'totalChatSentenceInfo',
    },
    {
      title: 'totalBotCorrect',
      tooltip: 'totalBotCorrectInfo',
    },
    {
      title: 'totalBotIncorrect',
      tooltip: 'totalBotIncorrectInfo',
    },
    {
      title: 'totalValidConversation',
      tooltip: 'totalValidConversationInfo',
    },
    {
      title: 'totalCorrectAnswer',
      tooltip: 'totalCorrectAnswerInfo',
    },
    {
      title: 'totalCorrectAnswerConfirm',
      tooltip: 'totalCorrectAnswerConfirmInfo',
    },
  ];
  useEffect(() => {
    if (collectType === 'usecase' && statisticDetail.length) {
      const newArr = [];
      for (let i = 0; i < statisticDetail.length; i += 1) {
        newArr.push(false);
      }
      setMenuState(newArr);
    }
  }, [statisticDetail]);

  const handleClickExpand = (index) => {
    const newArr = [...menuState];
    newArr[index] = !menuState[index];
    setMenuState(newArr);
  };

  return (
    <StatisticalTableStyle>
      <div className="container">
        <Typography gutterBottom variant="h5" component="h5" align="center">
          Bảng thống kê kết quả
        </Typography>
        <Table aria-label="customized table" className="table">
          <TableHead>
            <TableRow className="table-header">
              {titleTable.map((item) => (
                <TableCell
                  key={item}
                  align="left"
                  variant="head"
                  className="headerCell"
                >
                  <div className="cellContent">{t(item.title)}</div>
                </TableCell>
              ))}
              {collectType === 'usecase' && (
                <TableCell className="headerCell" />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {collectType === 'intent' &&
              statisticDetail &&
              statisticDetail.map((intent, index) => (
                <TableRow
                  key={intent.id}
                  className={index % 2 === 0 ? 'table-row ' : 'table-row-sole '}
                >
                  <TableCell align="center" className="cellBody">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" className="cellBody">
                    {intent.displayName}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {intent.sumMsg || 0}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {intent.sumBotCorrect || 0}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {intent.sumBotInCorrect || 0}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {intent.sumValidConversation || 0}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {intent.sumCorrectAnswer || 0}
                  </TableCell>
                  <TableCell align="center" className="cellBody">
                    {intent.sumMsgConfirm || 0}
                  </TableCell>
                </TableRow>
              ))}
            {collectType === 'usecase' &&
              statisticDetail &&
              statisticDetail.map((usecase, index) => (
                <>
                  <TableRow key={usecase.id}>
                    <TableCell align="center" className="cellBody">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row" className="cellBody">
                      {usecase.usecaseName}
                    </TableCell>
                    <TableCell align="center" className="cellBody">
                      {usecase.sumMsg || 0}
                    </TableCell>
                    <TableCell align="center" className="cellBody">
                      {usecase.sumBotCorrect || 0}
                    </TableCell>
                    <TableCell align="center" className="cellBody">
                      {usecase.sumBotInCorrect || 0}
                    </TableCell>
                    <TableCell align="center" className="cellBody">
                      {usecase.sumValidConversation || 0}
                    </TableCell>
                    <TableCell align="center" className="cellBody">
                      {usecase.sumCorrectAnswer || 0}
                    </TableCell>
                    <TableCell align="center" className="cellBody">
                      {usecase.sumMsgConfirm || 0}
                    </TableCell>
                    <TableCell>
                      <ExpandMoreIcon
                        color="secondary"
                        className="icon"
                        onClick={() => handleClickExpand(index)}
                      />
                    </TableCell>
                  </TableRow>
                  {menuState[index] &&
                    usecase.intents &&
                    usecase.intents.map((intent, intentIndex) => (
                      <TableRow
                        key={intent.id}
                        className={
                          intentIndex % 2 === 0
                            ? 'table-row'
                            : 'table-row-sole '
                        }
                      >
                        <TableCell align="center" className="cellBody">
                          {index + 1}.{intentIndex + 1}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className="cellBody"
                        >
                          {intent.displayName}
                        </TableCell>
                        <TableCell align="center" className="cellBody">
                          {intent.sumMsg || 0}
                        </TableCell>
                        <TableCell align="center" className="cellBody">
                          {intent.sumBotCorrect || 0}
                        </TableCell>
                        <TableCell align="center" className="cellBody">
                          {intent.sumBotInCorrect || 0}
                        </TableCell>
                        <TableCell align="center" className="cellBody">
                          {intent.sumValidConversation || 0}
                        </TableCell>
                        <TableCell align="center" className="cellBody">
                          {intent.sumCorrectAnswer || 0}
                        </TableCell>
                        <TableCell align="center" className="cellBody">
                          {intent.sumMsgConfirm || 0}
                        </TableCell>
                        <TableCell className="cellBody" />
                      </TableRow>
                    ))}
                </>
              ))}
          </TableBody>
        </Table>
      </div>
    </StatisticalTableStyle>
  );
}

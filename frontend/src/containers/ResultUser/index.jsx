import React from 'react';

import { Typography, Card } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import ResultUserStyle from './resultUser.style';
import ChartProgress from './ChatProgress';
import StatisticalTable from './StatisticalTable';

export default function ResultUser() {
  const { t } = useTranslation();
  const arrBox = [
    {
      title: 'Tổng số kịch bản chat',
      number: 5,
    },
    {
      title: 'Tổng số kịch bản đã chat',
      number: 6,
    },
    {
      title: 'Tổng số phiên chat',
      number: 20,
    },
    {
      title: 'Tổng số câu chat',
      number: 80,
    },
    {
      title: 'Tổng số câu hợp lệ bot đoán đúng',
      number: 80,
    },
    {
      title: 'Tổng số câu hợp lệ bot đoán sai',
      number: 80,
    },
  ];
  return (
    <ResultUserStyle>
      <div className="result-user-container">
        <Typography
          gutterBottom
          variant="h3"
          component="h3"
          className="title-result-user"
        >
          {t('progressCampaign')}
        </Typography>
        <div className="general-information">
          <Typography
            gutterBottom
            variant="h6"
            component="h5"
            className="title-general-information"
          >
            {t('generalInformation')}
          </Typography>
          <div className="container-box">
            {arrBox.map((item) => (
              <Card className="grid-item" key={item.title}>
                <div className="account-box title-account-box">
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h5"
                    className="sum-usecase"
                  >
                    {item.title}
                  </Typography>
                </div>
                <hr className="divider" />
                <div className="account-box number-account-box">
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h5"
                    className="number-sum-usecase"
                  >
                    {item.number}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="chart-progress">
          <ChartProgress />
        </div>
        <div className="statistical-table">
          <StatisticalTable />
        </div>
      </div>
    </ResultUserStyle>
  );
}

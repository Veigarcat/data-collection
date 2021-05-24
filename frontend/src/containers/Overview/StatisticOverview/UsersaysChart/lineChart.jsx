import React, { useMemo } from 'react';
import moment from 'moment';
import { Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  getAllDateBetweenTwoDays,
  getAllHoursBetweenTwoHours,
} from '../../../../utils/statistic';
import ChartContainer from '../../../../components/Chart/chartContainer';
import { mainColors } from '../../../../configs/styleConstant';

function UserSaysLineChart({ loading, range, data }) {
  const { t } = useTranslation();

  const chartOptions = useMemo(() => {
    if (loading || !data) return null;
    const [fromDate, toDate] = range;
    const duration = moment.duration(moment(toDate).diff(moment(fromDate)));
    const statisticByTime = duration.asDays() < 1;

    const drawDatas = [];
    const rangeDates = !statisticByTime
      ? getAllDateBetweenTwoDays(fromDate, toDate, 'DD-MM-YYYY')
      : getAllHoursBetweenTwoHours(0, 23);

    const listDates = data.map(({ label }) => label);

    rangeDates.forEach((date) => {
      const index = listDates.findIndex(
        (dateHasValue) => String(date) === String(dateHasValue),
      );
      if (index > -1) {
        drawDatas.push({
          date,
          value: data[index].value,
        });
      } else {
        drawDatas.push({
          date,
          value: {
            defaultAction: 0,
            getAction: 0,
            needConfirm: 0,
            defaultIntent: 0,
            silenceIntent: 0,
            total: 0,
          },
        });
      }
    });

    return {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'area',
      },
      title: {
        text: t('dailyChatGraph'),
      },
      xAxis: {
        title: {
          text: statisticByTime ? t('Hour') : t('Day'),
        },
        categories: drawDatas.map(({ date }) => date),
      },
      yAxis: {
        title: {
          text: t('amount'),
        },
      },
      colors: [mainColors.havelockBlue],
      series: [
        {
          name: t('totalPeopleChat'),
          data: drawDatas.map((drawData) => drawData.value.total),
        },
      ],
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 400,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
              },
            },
          },
        ],
      },
    };
  }, [loading, data]);

  return (
    <Card className="chartUserSays">
      <ChartContainer loading={loading} options={chartOptions} />
    </Card>
  );
}

export default UserSaysLineChart;

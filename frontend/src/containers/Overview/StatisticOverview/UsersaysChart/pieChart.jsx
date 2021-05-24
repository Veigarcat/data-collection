import React, { useMemo } from 'react';
import { Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getPercentage } from '../../../../utils/statistic';
import ChartContainer from '../../../../components/Chart/chartContainer';
// import { useTranslation } from '../../../../i18n';

function UserSaysPieChart({ loading, data }) {
  const { t } = useTranslation('dashboard');

  const chartOptions = useMemo(() => {
    if (loading || !data) return null;
    const { defaultAction, getAction, needConfirm } = data;

    const [
      percentDefaultAction,
      percentGetAction,
      percentNeedConfirm,
    ] = getPercentage(defaultAction, getAction, needConfirm);
    return {
      credits: {
        enabled: false,
      },
      title: {
        text: t('raitoEffectService'),
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.slug}</b>: {point.percentage:.2f} %',
          },
          showInLegend: true,
        },
      },
      colors: ['#90ed7d', '#f7a35c', '#8085e9'],
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
      },
      series: [
        {
          name: t('raito'),
          colorByPoint: true,
          data: [
            {
              slug: 'A2',
              name: t('totalGetActionCount'),
              y: percentGetAction,
              sliced: true,
              selected: true,
            },
            {
              slug: 'A3',
              name: t('totalNeedConfirmCount'),
              y: percentNeedConfirm,
            },
            {
              slug: 'A4',
              name: t('totalDefaultActionCount'),
              y: percentDefaultAction,
            },
          ],
        },
      ],
    };
  }, [loading, data]);

  return (
    <Paper>
      <ChartContainer loading={loading} options={chartOptions} />
    </Paper>
  );
}

export default UserSaysPieChart;

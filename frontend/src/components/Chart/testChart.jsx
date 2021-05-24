import Highcharts from 'highcharts';

function TestChart(props) {
  const { t, report, tab } = props;
  Highcharts.chart(`${tab}`, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: t('testChart'),
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
          format: '<b>{point.name}</b>: {point.percentage:.2f} %',
        },
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: t('trainSet'),
            y: report.splitPercentage * 100,
            sliced: true,
            selected: true,
          },
          {
            name: t('testSet'),
            y: (1 - report.splitPercentage) * 100,
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  });
}
export default TestChart;

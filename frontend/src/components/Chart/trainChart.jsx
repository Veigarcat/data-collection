import Highcharts from 'highcharts';

function TrainChart(props) {
  const { t, report, tab } = props;

  Highcharts.chart(`${tab}`, {
    chart: {
      type: 'column',
    },
    title: {
      text: t('trainChart'),
    },
    subtitle: {
      text: t('source'),
    },
    xAxis: {
      categories: [t('chartPrecision'), t('chartRecall'), t('chartF1')],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: '%',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'percentage',
        data: [
          report.trainReport.weightedAvg.precision * 100,
          report.trainReport.weightedAvg.recall * 100,
          report.trainReport.weightedAvg.f1Score * 100,
        ],
        dataLabels: {
          enabled: true,
          color: '#333',
          formatter() {
            return Highcharts.numberFormat(this.y, 2);
          },
        },
      },
    ],
    credits: {
      enabled: false,
    },
  });
}
export default TrainChart;

import React, { useEffect } from 'react';
import drawChart from './trainChart';
import ChartStyle from './chart.style';

function TrainChartContainer(props) {
  const { report, tab } = props;

  useEffect(() => {
    drawChart(props);
  }, [report, tab]);

  return (
    <ChartStyle>
      <div id={tab} />
    </ChartStyle>
  );
}

export default TrainChartContainer;

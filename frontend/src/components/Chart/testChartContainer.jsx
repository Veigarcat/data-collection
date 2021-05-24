import React, { useEffect } from 'react';
import drawChart from './testChart';
import ChartStyle from './chart.style';

function TestChartContainer(props) {
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

export default TestChartContainer;

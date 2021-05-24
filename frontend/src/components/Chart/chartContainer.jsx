import React, { useMemo, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Highcharts from 'highcharts';
import noData from 'highcharts/modules/no-data-to-display';
import { CircularProgress } from '@material-ui/core';
import ChartStyle from './chart.style';

if (typeof Highcharts === 'object') {
  noData(Highcharts);
}

function ChartContainer({ options, loading }) {
  const idContainer = useMemo(() => uuid(), []);

  useEffect(() => {
    if (!options) return;
    const colors = options.colors || [
      '#7cb5ec',
      '#90ed7d',
      '#f7a35c',
      '#8085e9',
      '#f15c80',
      '#e4d354',
      '#2b908f',
      '#f45b5b',
      '#91e8e1',
    ];

    Highcharts.chart(idContainer, { ...options, colors });
  }, [options]);

  const cls = !options ? 'placeholder' : '';

  return (
    <ChartStyle>
      {loading && (
        <div className="loadingChart">
          <CircularProgress />
        </div>
      )}
      <div id={idContainer} className={cls} />
    </ChartStyle>
  );
}

export default ChartContainer;

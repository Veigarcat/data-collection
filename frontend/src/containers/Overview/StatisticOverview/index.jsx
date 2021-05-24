import React, { useMemo, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Typography, Button, Divider } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { DateTimeRangePicker } from '../../../components/DateTimePicker';
import useRange from '../useRange';
import StyledStatistic from './statistic.style';

import TotalUserSayCard from './HeaderCard';
import { LineChartUserSays } from './UsersaysChart';
import { mainColors } from '../../../configs/styleConstant';
import { apiGetDataOverview } from '../../../apis/overview';

function StatisticOverview() {
  const { t } = useTranslation();
  const [
    range,
    defaultRanges,
    setRange,
    setToday,
    setWeekAgo,
    setMonthAgo,
    isToday,
    isWeekAgo,
    isMonthAgo,
  ] = useRange();
  const [data, setData] = useState([]);
  useEffect(() => {
    apiGetDataOverview()
      .then((res) => {
        setData(res.result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const dataUsersayPerDate = useMemo(() => {
    return [];
  }, []);

  const classToday = clsx('timeBox', { selected: isToday });
  const classWeek = clsx('timeBox', { selected: isWeekAgo });
  const classMonth = clsx('timeBox', { selected: isMonthAgo });

  return (
    <StyledStatistic mainColors={mainColors}>
      <div className="timeStatistic">
        <Lens />
        <Typography className="text">{t('generalInformation')}</Typography>
        <Button className={classToday} variant="outlined" onClick={setToday}>
          {t('today')}
        </Button>
        <Button className={classWeek} variant="outlined" onClick={setWeekAgo}>
          {t('week')}
        </Button>
        <Button className={classMonth} variant="outlined" onClick={setMonthAgo}>
          {t('month')}
        </Button>
        <DateTimeRangePicker
          showTime={false}
          defaultValue={range}
          cbChangeRange={setRange}
          blocks={defaultRanges}
          square={false}
        />
      </div>
      <Divider />
      <TotalUserSayCard dataTotalCount={data} />
      <LineChartUserSays data={dataUsersayPerDate} range={range} />
    </StyledStatistic>
  );
}

export default StatisticOverview;

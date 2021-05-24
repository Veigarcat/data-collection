import { useMemo, useState } from 'react';
import moment from 'moment';

const sameRange = (range, otherRange) => {
  const [startDate, endDate] = range;
  const [selectedStartDate, selectedEndDate] = otherRange;
  return (
    moment(startDate).isSame(selectedStartDate) &&
    moment(endDate).isSame(selectedEndDate)
  );
};

const today = [moment().startOf('day'), moment().endOf('day')];
const week = [
  moment().startOf('day').subtract(1, 'week').add(1, 'day'),
  moment().endOf('day'),
];
const month = [
  moment().startOf('day').subtract(1, 'month').add(1, 'day'),
  moment().endOf('day'),
];
const defaultRangeBlocks = [
  {
    label: 'today',
    range: today,
  },
  {
    label: 'weekAgo',
    range: week,
  },
  {
    label: 'monthAgo',
    range: month,
  },
];

const defaultRange = week;

function useRange(initRange, initBlocks) {
  const [range, setRange] = useState(initRange || defaultRange);
  const defaultRanges = useMemo(() => initBlocks || defaultRangeBlocks, []);
  const setDateTimeRange = (changeRange) => {
    setRange(changeRange);
  };
  const setToday = () => {
    setRange(today);
  };
  const setWeekAgo = () => {
    setRange(week);
  };

  const setMonthAgo = () => {
    setRange(month);
  };
  const isToday = sameRange(today, range);
  const isWeekAgo = sameRange(week, range);
  const isMonthAgo = sameRange(month, range);

  return [
    range,
    defaultRanges,
    setDateTimeRange,
    setToday,
    setWeekAgo,
    setMonthAgo,
    isToday,
    isWeekAgo,
    isMonthAgo,
  ];
}

export default useRange;

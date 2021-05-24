import moment from 'moment';

function formatDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return moment(date).format('DD-MM-YYYY');
}

const getAllDateBetweenTwoDays = (startDate, endDate, format) => {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  do {
    dates.push(moment(currDate.clone().toDate()).format(format));
  } while (currDate.add(1, 'days').diff(lastDate) < 1);

  return dates;
};

const getAllHoursBetweenTwoHours = (startHour, endHour) => {
  const hours = [];

  for (let i = startHour; i <= endHour; i += 1) {
    if (i < 10) {
      hours.push(`0${i}`);
    } else hours.push(`${i}`);
  }
  return hours;
};

const convertTimeToMs = (momentIns) => momentIns.clone().toDate().getTime();

const getPercentage = (...args) => {
  const argsArr = [...args];
  const lengthArgs = argsArr.length;

  const sum = argsArr.reduce((acc, cur) => acc + cur, 0);
  let percentSum = 0;
  return argsArr.map((arg, index) => {
    if (sum === 0) return Number(0).toFixed(2);
    if (index !== lengthArgs - 1) {
      const percent = parseFloat(((arg * 100) / sum).toFixed(2));
      percentSum += percent;
      return percent;
    }
    const percent = parseFloat((100 - percentSum).toFixed(2));
    return percent;
  });
};

export {
  getAllDateBetweenTwoDays,
  convertTimeToMs,
  getPercentage,
  formatDate,
  getAllHoursBetweenTwoHours,
};

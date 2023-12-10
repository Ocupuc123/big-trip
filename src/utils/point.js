import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
dayjs.extend(Duration);

const dateConverter = {
  'D MMM': (date) => dayjs(date).format('D MMM'),
  'HH:mm': (date) => dayjs(date).format('HH:mm'),
  'YYYY-MM-DDTHH:mm': (date) => dayjs(date).format('YYYY-MM-DDTHH:mm'),
  'DD/MM/YY HH:mm': (date) => dayjs(date).format('DD/MM/YY HH:mm'),
};

export const humanizeDate = (date, format = 'HH:mm') => dateConverter[format](date);

export const compareTwoDates = (dateA, dateB) => dayjs(dateA).diff(dateB);

export const getTimeDuration = (initialDate, expirationDate) => {
  const difference = compareTwoDates(expirationDate, initialDate);
  const duration = dayjs.duration(difference).$d;

  const day = duration.days < 10 ? `0${duration.days}D` : `${duration.days}D`;
  const hour = duration.hours < 10 ? `0${duration.hours}H` : `${duration.hours}H`;
  const minute = duration.minutes < 10 ? `0${duration.minutes}M` : `${duration.minutes}M`;
  let total;
  if ((difference / 60000) > 1440) {
    total = `${day} ${hour} ${minute}`;
  } else if ((difference / 60000) > 60) {
    total = `${hour} ${minute}`;
  } else {
    total = minute;
  }
  return total;
};

export const sortPriceUp = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortTimeUp = (pointA, pointB) => {
  const dateA = compareTwoDates(pointA.dateFrom, pointA.dateTo);
  const dateB = compareTwoDates(pointB.dateFrom, pointB.dateTo);

  return dateA - dateB;
};

export const sortDateDown = (pointA, pointB) => pointA.dateFrom - pointB.dateFrom;

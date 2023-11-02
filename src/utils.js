import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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
  const total = (difference / 60000) > 1440 ? `${day} ${hour} ${minute}` : (difference / 60000) > 60 ? `${hour} ${minute}` : minute;
  return total;
};

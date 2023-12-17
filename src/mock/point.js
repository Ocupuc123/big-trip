import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/common.js';
import { generateOffers } from '../mock/offer.js';
import { generateDestination } from '../mock/destination.js';
import { TYPES } from '../const.js';

const generateTypes = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

const getRandomPrice = () => {
  const prices = ['120', '60', '80', '100'];

  return prices[getRandomInteger(0, prices.length - 1)];
};

const generateDate = () => {
  let startDate = dayjs().add(getRandomInteger(-7, -4), 'd');

  return () => {
    const dateFrom = dayjs(startDate).add(getRandomInteger(60, 120), 'm').toDate();
    const dateTo = dayjs(dateFrom).add(getRandomInteger(180, 2880), 'm').toDate();
    startDate = dateTo;
    return {
      dateFrom,
      dateTo,
    };
  };
};

const date = generateDate();

export const generatePoint = () => {
  const type = generateTypes();
  const dateInterval = date();
  const offersByType = generateOffers[type];

  return {
    id: nanoid(),
    type,
    destination: generateDestination(),
    offers: offersByType,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomPrice(),
    dateFrom: dateInterval.dateFrom,
    dateTo: dateInterval.dateTo
  };
};

import dayjs from 'dayjs';

import { getRandomInteger } from '../utils';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const NAMES = ['Chamonix', 'Amsterdam', 'Geneva'];
const DESCRIPTIONS = ['Chamonix, is a beautiful city, a true asian pearl, with crowded streets.', 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.', 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.'];

const generateTypes = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

const generatePictures = () => ({
  src: `img/photos/${getRandomInteger(1, 5)}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]
});

const generateDestination = () => ({
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  pictures: new Array(getRandomInteger(0, 3)).fill().map(generatePictures)
});

const generateOffer = (index) => {
  const titles = ['Upgrade to a business class', 'Choose the radio station', 'Choose meal', 'Upgrade to comfort class'];
  const prices = ['120', '60', '80', '30'];

  return {
    type: TYPES[index],
    offers: new Array(getRandomInteger(0, 2)).fill().map(() => ({
      title: titles[getRandomInteger(0, titles.length - 1)],
      price: prices[getRandomInteger(0, prices.length - 1)]
    }))
  };
};

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

const offers = new Array(TYPES.length).fill().map((item, index) => generateOffer(index));

export const generatePoint = () => {
  const type = generateTypes();
  const dateInterval = date();

  return {
    type,
    destination: generateDestination(),
    offers: offers.find((it) => it.type === type).offers,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomPrice(),
    dateFrom: dateInterval.dateFrom,
    dateTo: dateInterval.dateTo
  };
};

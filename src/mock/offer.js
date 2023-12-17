import { TYPES } from '../const.js';
import { getRandomInteger } from '../utils/common.js';

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

export const generateOffers = TYPES.reduce((acc, type, index) => {
  acc[type] = generateOffer(index).offers;
  return acc;
}, {});

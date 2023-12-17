import { getRandomInteger } from '../utils/common.js';
import { CITIES, DESCRIPTIONS } from '../const.js';

const pictures = () => ({
  src: `img/photos/${getRandomInteger(1, 5)}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]
});

export const generateDestination = (nameValue) => {
  if (nameValue) {
    return {
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      name: nameValue,
      pictures: new Array(getRandomInteger(0, 3)).fill().map(pictures)
    };
  }
  return {
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    name: CITIES[getRandomInteger(0, CITIES.length - 1)],
    pictures: new Array(getRandomInteger(0, 3)).fill().map(pictures)
  };
};

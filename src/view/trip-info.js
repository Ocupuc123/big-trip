import { humanizeDate, compareTwoDates } from '../utils';
import { createElement } from '../utils';

const getTotalCost = (points) => {
  let totalCost = 0;
  for (const point of points) {
    const { basePrice, offers } = point;
    totalCost += Number(basePrice);

    if (offers.length) {
      for (const offer of offers) {
        totalCost += Number(offer.price);
      }
    }
  }

  return totalCost;
};

const getTotalRoutes = (points) => {
  const totalRoutes = [];
  for (const point of points) {
    totalRoutes.push(point.destination.name);
  }

  return totalRoutes;
};

const getTotalDateGap = (points) => {
  const datesFrom = points.map(({dateFrom}) => dateFrom).sort(compareTwoDates).shift();
  const datesTo = points.map(({dateTo}) => dateTo).sort(compareTwoDates).pop();
  return `${humanizeDate(datesFrom, 'D MMM')} - ${humanizeDate(datesTo, 'D MMM')}`;
};


const createTotalRoutesName = (names) => names.map((name) => `${name}`).join(' &mdash; ');

const createRouteAndCostTemplate = (points) => `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createTotalRoutesName(getTotalRoutes(points))}</h1>
    <p class="trip-info__dates">${getTotalDateGap(points)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalCost(points)}</span>
  </p>
  </section>`;

export default class Info {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createRouteAndCostTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

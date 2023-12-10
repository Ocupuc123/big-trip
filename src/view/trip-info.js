import { humanizeDate, compareTwoDates } from '../utils/point.js';
import AbstractView from '../view/abstract.js';

const totalCost = (points) => points.reduce((total, point) => {
  const { basePrice, offers } = point;
  total += Number(basePrice);

  if (offers.length) {
    total += offers.reduce((offerCost, offer) => offerCost + Number(offer.price), 0);
  }

  return total;
}, 0);

const totalRoutes = (points) => points.map((point) => point.destination.name);

const getTotalDateGap = (points) => {
  const datesFrom = points.map(({dateFrom}) => dateFrom).sort(compareTwoDates).shift();
  const datesTo = points.map(({dateTo}) => dateTo).sort(compareTwoDates).pop();
  return `${humanizeDate(datesFrom, 'D MMM')} - ${humanizeDate(datesTo, 'D MMM')}`;
};

const createTotalRoutesName = (names) => names.join(' &mdash; ');

const createRouteAndCostTemplate = (points) => {
  const totalRoutesNames = createTotalRoutesName(totalRoutes(points));
  const totalCostValue = totalCost(points);
  const totalDateGap = getTotalDateGap(points);

  return `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${totalRoutesNames}</h1>
      <p class="trip-info__dates">${totalDateGap}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCostValue}</span>
    </p>
  </section>`;
};

export default class Info extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createRouteAndCostTemplate(this._points);
  }
}

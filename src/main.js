import { createTripInfoTemplate } from './view/trip-info.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createRouteInformationTemplate } from './view/route-information.js';
import { createCostTemplate } from './view/trip-cost.js';
import { createFiltersTemplate } from './view/filter.js';
import { createSortTemplate } from './view/sort.js';
import { createTripEventsListTemplate } from './view/trip-events-list.js';
import { createNewPointTemplate } from './view/new-point.js';
import { createEditPointTemplate } from './view/edit-point.js';
import { createPointTemplate } from './view/point.js';

const POINT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const navigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(navigationElement, createSiteMenuTemplate(), 'beforeend');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

const tripInfoElement = tripMainElement.querySelector('.trip-info');

render(tripInfoElement, createRouteInformationTemplate(), 'beforeend');
render(tripInfoElement, createCostTemplate(), 'beforeend');
render(filtersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortTemplate(), 'beforeend');
render(tripEventsElement, createTripEventsListTemplate(), 'beforeend');

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

render(tripEventsListElement, createEditPointTemplate(), 'beforeend');
render(tripEventsListElement, createNewPointTemplate(), 'beforeend');

for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createPointTemplate(), 'beforeend');
}

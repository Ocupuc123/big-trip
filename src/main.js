import { createRouteAndCostTemplate } from './view/trip-info';
import { createMenuTemplate } from './view/trip-tabs';
import { createFilterTemplate } from './view/trip-filters';
import { createSortTemplate } from './view/trip-sort';
import { createTripEventsListTemplate } from './view/trip-events-list';
import { createAddNewPointTemplate } from './view/add-new-point';
import { createEditPointTemplate } from './view/edit-point';
import { createPointTemplate } from './view/point';

const POINT_COUNT = 3;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = document.querySelector('.trip-controls__navigation');
const tripFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(tripMainElement, createRouteAndCostTemplate(), 'afterbegin');
render(tripNavigationElement, createMenuTemplate());
render(tripFilterElement, createFilterTemplate());
render(tripEventsElement, createSortTemplate(), 'afterbegin');
render(tripEventsElement, createTripEventsListTemplate());

const tripEventsListElement = document.querySelector('.trip-events__list');

render(tripEventsListElement, createAddNewPointTemplate(), 'afterbegin');
render(tripEventsListElement, createEditPointTemplate(), 'afterbegin');

for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createPointTemplate());
}

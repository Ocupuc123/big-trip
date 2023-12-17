import TripInfoView from './view/trip-info';
import MenuView from './view/trip-tabs';
import FilterView from './view/trip-filters';
import TripPresenter from './presenter/trip';
import { render, RenderPosition } from './utils/render';
import { sortDateDown } from './utils/point'; //
import { generatePoint } from './mock/point';

const POINT_COUNT = 5;

const points = new Array(POINT_COUNT).fill().map(generatePoint).sort(sortDateDown);

// console.log(points);

const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = document.querySelector('.trip-controls__navigation');
const tripFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(tripMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);
render(tripFilterElement, new FilterView(), RenderPosition.BEFOREEND);
render(tripNavigationElement, new MenuView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(points);

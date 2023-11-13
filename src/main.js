import TripInfoView from './view/trip-info';
import MenuView from './view/trip-tabs';
import FilterView from './view/trip-filters';
import SortView from './view/trip-sort';
import EventsListView from './view/trip-events-list';
import PointView from './view/point';
import EditPointView from './view/edit-point';
// import AddNewPointView from './view/add-new-point';
import NoPointView from './view/no-point';
import { render, RenderPosition } from './utils';
import { generatePoint } from './mock/point';

const POINT_COUNT = 3;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

// console.log(points);

const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = document.querySelector('.trip-controls__navigation');
const tripFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventsListComponent = new EventsListView();
const noPointComponent = new NoPointView();
// const addNewPointComponent = new AddNewPointView();

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', escKeyDownHandler);
  });

  pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
    document.removeEventListener('keydown', escKeyDownHandler);
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripMainElement, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);
render(tripFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(tripNavigationElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);

if (points.length) {
  for (let i = 0; i < POINT_COUNT; i++) {
    renderPoint(eventsListComponent.getElement(), points[i]);
  }

  render(tripEventsElement, eventsListComponent.getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, noPointComponent.getElement(), RenderPosition.BEFOREEND);
}

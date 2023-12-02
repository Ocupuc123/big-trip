import TripInfoView from './view/trip-info';
import MenuView from './view/trip-tabs';
import FilterView from './view/trip-filters';
import SortView from './view/trip-sort';
import EventsListView from './view/trip-events-list';
import PointView from './view/point';
import EditPointView from './view/edit-point';
// import AddNewPointView from './view/add-new-point';
import NoPointView from './view/no-point';
import { render, RenderPosition, replace, remove } from './utils/render';
import { generatePoint } from './mock/point';

const POINT_COUNT = 3;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

// console.log(points);

// const eventButtonElement = document.querySelector('.trip-main__event-add-btn');
const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = document.querySelector('.trip-controls__navigation');
const tripFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventsListComponent = new EventsListView();
const noPointComponent = new NoPointView();
// const addNewPointComponent = new AddNewPointView();

const isEmptyPoints = (component) => component.getElement().childElementCount === 0;

const renderNoPointsText = () => render(tripEventsElement, noPointComponent, RenderPosition.BEFOREEND);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, pointEditComponent);
  };

  const escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', escKeyDownHandler);
  });

  pointEditComponent.setFormCloseClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', escKeyDownHandler);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', escKeyDownHandler);
  });

  pointEditComponent.setFormRemoveClickHandler(() => {
    remove(pointEditComponent);
    document.removeEventListener('keydown', escKeyDownHandler);

    if(isEmptyPoints(pointListElement)) {
      renderNoPointsText();
    }
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

render(tripMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);
render(tripFilterElement, new FilterView(), RenderPosition.BEFOREEND);
render(tripNavigationElement, new MenuView(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortView(), RenderPosition.AFTERBEGIN);

points.forEach((point) => {
  renderPoint(eventsListComponent, point);
});

render(tripEventsElement, eventsListComponent, RenderPosition.BEFOREEND);

if(isEmptyPoints(eventsListComponent)) {
  renderNoPointsText();
}

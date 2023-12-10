import PointPresenter from './point';
import EventsListView from '../view/trip-events-list';
import SortView from '../view/trip-sort';
import NoPointView from '../view/no-point';
import { render, RenderPosition } from '../utils/render';
import { updateItem } from '../utils/common';
import { sortPriceUp, sortTimeUp } from '../utils/point';
import { SortType } from '../const';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._eventsListComponent = new EventsListView();
    this._noPointComponent = new NoPointView();
    this._sortViewComponent = new SortView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedTripPoints = tripPoints.slice();

    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _handlePointChange(updatePoint) {
    this._tripPoints = updateItem(this._tripPoints, updatePoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatePoint);
    this._pointPresenter[updatePoint.id].init(updatePoint);
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE_UP:
        this._tripPoints.sort(sortPriceUp);
        break;
      case SortType.TIME_UP:
        this._tripPoints.sort(sortTimeUp);
        break;
      default:
        this._tripPoints = this._sourcedTripPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPoints();
    this._renderPoints();
  }

  _renderSort() {
    this._sortViewComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortViewComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderNoPoints() {
    render(this._tripContainer, new NoPointView(), RenderPosition.BEFOREEND);
  }

  _clearPoints() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderTrip() {
    if (this._tripPoints.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints();
  }
}

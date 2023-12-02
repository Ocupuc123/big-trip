import AbstractView from '../view/abstract.js';

const createTripEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventsList extends AbstractView {
  getTemplate() {
    return createTripEventsListTemplate();
  }
}

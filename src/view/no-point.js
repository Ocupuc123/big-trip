import AbstractView from '../view/abstract.js';

const createNoPointTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoTask extends AbstractView {
  getTemplate() {
    return createNoPointTemplate();
  }
}

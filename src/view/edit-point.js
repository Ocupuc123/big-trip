import { humanizeDate } from '../utils/point.js';
import SmartView from '../view/smart.js';
import { TYPES, CITIES } from '../const.js';
import { generateOffers } from '../mock/offer.js';
import { generateDestination } from '../mock/destination.js';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  id: '',
  type: '',
  destination: {
    description: '',
    name: '',
    pictures: ''
  },
  offers: [],
  isFavorite: false,
  basePrice: '',
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z'
};

const createCities = (cities) => cities.map((city) => `<option value="${city}"></option>`).join('');

const createPictures = (pictures) => pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('');

const createOfferSelectors = (offers, id ) => offers.map(({ price, title }, index) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.toLowerCase().replace(/ /g, '-')}-${id}-${index}" type="checkbox" name="event-offer-${title.toLowerCase().replace(/ /g, '-')}" value="${title.toLowerCase().replace(/ /g, '-')}" checked >
  <label class="event__offer-label" for="event-offer-${title.toLowerCase().replace(/ /g, '-')}-${id}-${index}">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
  </div>`).join('');

const createEventTypeList = (currentType, id) => TYPES.map((type, index) => `
<div class="event__type-item">
  <input id="event-type-${type}-${id}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}-${index}">${type}</label>
</div>`).join('');

const createEditPointTemplate = ({ type, destination, basePrice, offers, dateFrom, dateTo, id }) => `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          ${type ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">` : ''}
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
  
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeList(type, id)}
          </fieldset>
        </div>
      </div>
  
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
          ${createCities(CITIES)}
        </datalist>
      </div>
  
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeDate(dateFrom, 'DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${humanizeDate(dateTo, 'DD/MM/YY HH:mm')}">
      </div>
  
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
      </div>
  
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offers.length ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createOfferSelectors(offers, id, type)}
        </div>
      </section>` : ''}
  
      <section class="event__section  event__section--destination">
        ${destination.description || destination.pictures.length ? '<h3 class="event__section-title  event__section-title--destination">Destination</h3>' : ''}
        ${destination.description ? `<p class="event__destination-description">${destination.description}</p>` : ''}
        ${destination.pictures.length ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPictures(destination.pictures)}
        </div>
      </div>` : ''}
      </section>
    </section>
  </form>
  </li>`;

export default class EditPoint extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = EditPoint.parsePointToData(point);
    this.dateFromDatepicker = null;
    this.dateToDatepicker = null;

    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._formRemoveClickHanlder = this._formRemoveClickHanlder.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  _setDatepicker() {
    if (this.dateFromDatepicker) {
      this.dateFromDatepicker.destroy();
      this.dateFromDatepicker = null;
    }

    if (this.dateToDatepicker) {
      this.dateToDatepicker.destroy();
      this.dateToDatepicker = null;
    }

    this.dateFromDatepicker = flatpickr(this.getElement().querySelector('[name="event-start-time"]'),{
      dateFormat: 'd/m/y H:i',
      defaultDate: this._data.dateFrom,
      onClose: this._dateFromChangeHandler,
      'locale': Russian,
      enableTime: true
    });

    this.dateToDatepicker = flatpickr(this.getElement().querySelector('[name="event-end-time"]'),{
      dateFormat: 'd/m/y H:i',
      defaultDate: this._data.dateTo,
      onClose: this._dateToChangeHandler,
      'locale': Russian,
      enableTime: true
    });
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate
    });
  }

  _formRemoveClickHanlder() {
    this._callback.remove();
  }

  _formCloseClickHandler() {
    this._callback.close();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseDataToPoint(this._data));
  }

  _eventTypeChangeHandler(evt) {
    const type = evt.target.value;

    this.updateData({
      type,
      offers: generateOffers[type],
      isOfferChecked: false
    });
  }

  _eventDestinationChangeHandler(evt) {
    const name = evt.target.value;

    this.updateData({
      destination: generateDestination(name)
    });
  }

  _eventPriceChangeHandler(evt) {
    const input = evt.target;
    const value = input.value;
    input.value = value.replaceAll(/\D/g, '');

    this.updateData({
      basePrice: value
    }, true);
  }

  _setInnerHandlers() {
    const eventTypeInputs = this.getElement().querySelectorAll('[name="event-type"]');
    const eventDestinationInput = this.getElement().querySelector('[name="event-destination"]');
    const eventPriceInput = this.getElement().querySelector('[name="event-price"]');

    eventTypeInputs.forEach((input) => {
      input.addEventListener('change', this._eventTypeChangeHandler);
    });

    eventDestinationInput.addEventListener('change', this._eventDestinationChangeHandler);
    eventPriceInput.addEventListener('input', this._eventPriceChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormCloseClickHandler(this._callback.close);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRemoveClickHandler(this._callback.remove);
  }

  reset(point) {
    this.updateData(EditPoint.parsePointToData(point));
  }

  setFormRemoveClickHandler(callback) {
    this._callback.remove = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formRemoveClickHanlder);
  }

  setFormCloseClickHandler(callback) {
    this._callback.close = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  getTemplate() {
    return createEditPointTemplate(this._data);
  }

  static parsePointToData(point) {
    return {
      ...point,
    };
  }

  static parseDataToPoint(data) {

    data = {
      ...data
    };

    return data;
  }
}

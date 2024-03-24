import { FormEvent, Fragment, useId, useRef, useState } from 'react';
import EVENT_COLORS, {
  CalendarEvent,
  CalendarEventFormProps,
} from '../../models/calendar';
import formatDate from '../../utils/formatDate';
import Modal from '../Modal';
import { UnionOmit } from '../../utils/types';

export default function EventFormModal({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: CalendarEventFormProps) {
  const isNew = !event;
  const formId = useId();
  const [selectedColor, setSelectedColor] = useState(event?.color || null);
  const [isAllDayCheck, setIsAllDayCheck] = useState(event?.allDay || false);
  const [startTime, setStartTime] = useState(event?.startTime || '');
  const [endTime, setEndTime] = useState(event?.endTime || '');
  const nameRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: FormEvent) => {
    console.log('Form submitted');
    e.preventDefault();

    const name = nameRef.current?.value;

    if (
      !(event?.date || date) ||
      !name ||
      !selectedColor ||
      (isAllDayCheck && (!startTime || !endTime))
    ) {
      return;
    }

    let newEvent: UnionOmit<CalendarEvent, 'id'>;

    const eventProps = {
      name,
      color: selectedColor,
      date: date || event?.date,
    };

    if (isAllDayCheck) {
      newEvent = { ...eventProps, allDay: true };
    } else {
      newEvent = {
        ...eventProps,
        allDay: false,
        startTime,
        endTime,
      };
    }

    onSubmit(newEvent);

    modalProps.onClose();
  };

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNew ? 'Add' : 'Edit'} Event</div>
        <small>{formatDate(date || event.date, { dateStyle: 'short' })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input required type="text" id={`${formId}-name`} ref={nameRef} />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id={`${formId}-all-day`}
            checked={isAllDayCheck}
            onChange={(e) => setIsAllDayCheck(e.target.checked)}
          />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input
              id={`${formId}-start-time`}
              type="time"
              value={startTime}
              required={!isAllDayCheck}
              disabled={isAllDayCheck}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input
              id={`${formId}-end-time`}
              type="time"
              value={endTime}
              required={!isAllDayCheck}
              disabled={isAllDayCheck}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {EVENT_COLORS.map((color) => (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={`${formId}-color-${color}`}
                  className="color-radio"
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                />
                <label htmlFor={`${formId}-color-${color}`}>
                  <span className="sr-only">{color}</span>
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-success"
            type="submit"
            onClick={handleFormSubmit}
          >
            {isNew ? 'Add' : 'Edit'}
          </button>
          {!isNew && onDelete && (
            <button className="btn btn-delete" type="button" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

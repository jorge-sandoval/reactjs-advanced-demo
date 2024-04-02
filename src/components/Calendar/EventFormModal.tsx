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
    e.preventDefault();

    const name = nameRef.current?.value;

    if (
      !(event?.date || date) ||
      !name ||
      !selectedColor ||
      (!isAllDayCheck && (!startTime || !endTime))
    ) {
      return;
    }

    let formEvent: UnionOmit<CalendarEvent, 'id'>;

    const eventProps = {
      name,
      color: selectedColor,
      date: date || event?.date,
    };

    if (isAllDayCheck) {
      formEvent = { ...eventProps, allDay: true };
    } else {
      formEvent = {
        ...eventProps,
        allDay: false,
        startTime,
        endTime,
      };
    }

    onSubmit(formEvent);

    modalProps.onClose();

    if (isNew) {
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedColor(null);
    setIsAllDayCheck(false);
    setStartTime('');
    setEndTime('');
    nameRef.current!.value = '';
  };

  return (
    <Modal {...modalProps}>
      <Modal.Header>
        <div className="d-flex flex-grow-1 justify-content-between align-items-center fs-4">
          <div>{isNew ? 'Add' : 'Edit'} Event</div>
          <small className="text-dark">
            {formatDate(date || event.date, { dateStyle: 'short' })}
          </small>
          <button
            className="fs-6 btn-close ms-0"
            onClick={modalProps.onClose}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-2">
          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor={`${formId}-name`}>
                Name
              </label>
              <input
                id={`${formId}-name`}
                type="text"
                className="form-control"
                ref={nameRef}
                defaultValue={event?.name}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-check">
                <input
                  id={`${formId}-all-day`}
                  type="checkbox"
                  className="form-check-input"
                  checked={isAllDayCheck}
                  onChange={(e) => setIsAllDayCheck(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${formId}-all-day`}
                >
                  All Day?
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label" htmlFor={`${formId}-start-time`}>
                Start Time
              </label>
              <input
                id={`${formId}-start-time`}
                className="form-control"
                type="time"
                value={startTime}
                required={!isAllDayCheck}
                disabled={isAllDayCheck}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label" htmlFor={`${formId}-end-time`}>
                End Time
              </label>
              <input
                id={`${formId}-end-time`}
                className="form-control"
                type="time"
                value={endTime}
                required={!isAllDayCheck}
                disabled={isAllDayCheck}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <label className="form-label">Color</label>
            <div className="col">
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
                  <label
                    className="me-1"
                    htmlFor={`${formId}-color-${color}`}
                  ></label>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="row">
            {isNew && <div className="col-sm-6"></div>}
            <div className="col-sm-6">
              <button
                className="w-100 btn btn-primary"
                type="submit"
                onClick={handleFormSubmit}
              >
                {isNew ? 'Add' : 'Edit'}
              </button>
            </div>
            {!isNew && (
              <div className="col-sm-6">
                <button
                  className="w-100 btn btn-danger"
                  type="button"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

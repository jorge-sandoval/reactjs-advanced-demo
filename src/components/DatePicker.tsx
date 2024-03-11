import { useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export default function DatePicker({
  value,
  isOpen,
  onChange,
  setIsOpen,
}: {
  value?: Date;
  isOpen: boolean;
  onChange: (date: Date) => void;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [visibleMonth, setVisibleMonth] = useState(value || new Date());
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  function showPreviousMonth() {
    setVisibleMonth((m) => addMonths(m, -1));
  }

  function showNextMonth() {
    setVisibleMonth((m) => addMonths(m, 1));
  }

  function selectDate(date: Date) {
    onChange(date);
    setIsOpen(false);
    setVisibleMonth(date);
  }
  return (
    <>
      <div className={`position-absolute ${!isOpen && 'd-none'}`}>
        <div
          className={`card border-light-subtle shadow-sm date-picker p-2 mt-3`}
        >
          <div className="d-flex justify-content-between align-items-center fw-bold small-text">
            <button
              className="prev-month-button month-button"
              onClick={showPreviousMonth}
            >
              &larr;
            </button>
            <div className="current-month">
              {format(visibleMonth, 'MMMM - yyyy')}
            </div>
            <button
              className="next-month-button month-button"
              onClick={showNextMonth}
            >
              &rarr;
            </button>
          </div>
          <div className="date-picker-grid fw-bold tiny-text">
            {days.map((day, i) => (
              <div key={i}>{day}</div>
            ))}
          </div>
          <div className="date-picker-grid-dates date-picker-grid">
            {visibleDates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => selectDate(date)}
                className={`btn ${
                  !isSameMonth(date, visibleMonth) &&
                  !(value && isSameDay(date, value)) &&
                  'text-body-tertiary'
                } ${
                  isToday(date) &&
                  !(value && isSameDay(date, value)) &&
                  'border border-primary'
                } ${value && isSameDay(date, value) && 'btn-primary'}`}
              >
                {format(date, 'd')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

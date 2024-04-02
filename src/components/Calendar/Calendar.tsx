import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useMemo, useState } from 'react';
import CalendarDay from './CalendarDay';
import formatDate from '../../utils/formatDate';
import useCalendarEvents from '../../hooks/useCalendarEvents';

export default function Calendar({ value }: { value?: Date }) {
  const [selectedMonth, setSelectedMonth] = useState(value || new Date());
  const calendarDates = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(selectedMonth)),
      end: endOfWeek(endOfMonth(selectedMonth)),
    });
  }, [selectedMonth]);

  const { events } = useCalendarEvents();

  return (
    <>
      <div className="h-100 d-flex flex-column text-dark">
        <div className="d-flex align-items-center py-3">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setSelectedMonth(new Date())}
          >
            Today
          </button>
          <div>
            <button
              className="month-button"
              onClick={() => setSelectedMonth((m) => addMonths(m, -1))}
            >
              &lt;
            </button>
            <button
              className="month-button"
              onClick={() => setSelectedMonth((m) => addMonths(m, 1))}
            >
              &gt;
            </button>
          </div>
          <span className="fs-4 fw-bold">
            {formatDate(selectedMonth, { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className="days">
          {calendarDates.map((date, index) => (
            <CalendarDay
              key={date.getTime()}
              day={date}
              showWeekName={index < 7}
              selectedMonth={selectedMonth}
              events={events.filter((e) => isSameDay(e.date, date))}
            />
          ))}
        </div>
      </div>
    </>
  );
}

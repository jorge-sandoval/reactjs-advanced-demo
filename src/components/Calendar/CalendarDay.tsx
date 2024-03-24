import { endOfDay, isBefore, isSameMonth, isToday } from 'date-fns';
import cssClass from '../../utils/cssClass';
import formatDate from '../../utils/formatDate';
import { CalendarDayProps } from '../../models/calendar';
import { useState } from 'react';
import EventFormModal from './EventFormModal';

export default function CalendarDay({
  day,
  selectedMonth,
  showWeekName,
  events = [],
}: CalendarDayProps) {
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  const handleAddEvent = () => {};

  return (
    <>
      <div
        className={cssClass(
          'day',
          !isSameMonth(day, selectedMonth) && 'non-month-day',
          isBefore(endOfDay(day), new Date()) && 'old-month-day'
        )}
      >
        <div className="day-header">
          {showWeekName && (
            <div className="week-name">
              {formatDate(day, { weekday: 'short' })}
            </div>
          )}
          <div className={cssClass('day-number', isToday(day) && 'today')}>
            {formatDate(day, { day: 'numeric' })}
          </div>
          <button
            className="add-event-btn"
            onClick={() => setIsNewEventModalOpen(true)}
          >
            +
          </button>
        </div>

        {events.length > 0 && (
          <div className="events">
            <button className="all-day-event green event">
              <div className="event-name">Short</div>
            </button>
            {events.map(() => (
              <button className="event">
                <div className="color-dot blue"></div>
                <div className="event-time">7am</div>
                <div className="event-name">Event Name</div>
              </button>
            ))}
          </div>
        )}
      </div>
      <EventFormModal
        isOpen={isNewEventModalOpen}
        date={day}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={handleAddEvent}
      />
    </>
  );
}

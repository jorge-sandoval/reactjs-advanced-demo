import { endOfDay, isBefore, isSameMonth, isToday, parse } from 'date-fns';
import cssClass from '../../utils/cssClass';
import formatDate from '../../utils/formatDate';
import { CalendarDayProps, CalendarEvent } from '../../models/calendar';
import { useMemo, useState } from 'react';
import EventFormModal from './EventFormModal';
import useCalendarEvents from '../../hooks/useCalendarEvents';
import CalendarEventView from './CalendarEventView';
import OverflowContainer from '../OverflowContainer';

export default function CalendarDay({
  day,
  selectedMonth,
  showWeekName,
  events,
}: CalendarDayProps) {
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  const { addEvent } = useCalendarEvents();

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      if (a.allDay && b.allDay) return 0;
      if (a.allDay && !b.allDay) return -1;
      if (!a.allDay && b.allDay) return 1;

      const startTimeA = a.startTime
        ? parse(a.startTime, 'HH:mm', a.date)
        : null;
      const startTimeB = b.startTime
        ? parse(b.startTime, 'HH:mm', b.date)
        : null;

      if (startTimeA && !startTimeB) return -1;
      if (!startTimeA && startTimeB) return 1;

      if (startTimeA && startTimeB) {
        return startTimeA.getTime() - startTimeB.getTime();
      }

      return 0;
    });
  }, [events]);

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

        {sortedEvents.length > 0 && (
          <OverflowContainer<CalendarEvent>
            className="events"
            items={sortedEvents}
            getKey={(event) => event.id}
            renderItem={(event) => <CalendarEventView event={event} />}
            renderOverflow={(amount) => (
              <>
                <button className="events-view-more-btn">+{amount} More</button>
              </>
            )}
          />
        )}
      </div>
      <EventFormModal
        isOpen={isNewEventModalOpen}
        date={day}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={addEvent}
      />
    </>
  );
}

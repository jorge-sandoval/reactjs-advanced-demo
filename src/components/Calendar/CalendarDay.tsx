import { endOfDay, isBefore, isSameMonth, isToday, parse } from 'date-fns';
import cssClass from '../../utils/cssClass';
import formatDate from '../../utils/formatDate';
import { CalendarDayProps, CalendarEvent } from '../../models/calendar';
import { useMemo, useState } from 'react';
import EventFormModal from './EventFormModal';
import useCalendarEvents from '../../hooks/useCalendarEvents';
import CalendarEventView from './CalendarEventView';
import OverflowContainer from '../OverflowContainer';
import ViewMoreEventsModal from './ViewMoreEventsModal';

export default function CalendarDay({
  day,
  selectedMonth,
  showWeekName,
  events,
}: CalendarDayProps) {
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isViewMoreEventsModalOpen, setIsViewMoreEventsModalOpen] =
    useState(false);

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

  const oldMonthDay = isBefore(endOfDay(day), new Date());
  return (
    <>
      <div
        className={cssClass(
          'day bg-white p-1 overflow-hidden d-flex flex-column',
          !isSameMonth(day, selectedMonth) && 'opacity-75'
        )}
      >
        <div
          className={cssClass(
            oldMonthDay && 'opacity-50',
            'd-flex flex-column align-items-center position-relative mb-1'
          )}
        >
          {showWeekName && (
            <div className="tiny-text text-uppercase fw-bold text-muted mb-2">
              {formatDate(day, { weekday: 'short' })}
            </div>
          )}
          <div
            className={cssClass(
              'd-flex justify-content-center align-items-center',
              isToday(day) && 'badge rounded-pill text-bg-primary'
            )}
          >
            {formatDate(day, { day: 'numeric' })}
          </div>
          <button
            className="btn btn-sm btn-outline-light rounded-circle position-absolute end-0 top-0 py-0 px-1"
            onClick={() => setIsNewEventModalOpen(true)}
          >
            +
          </button>
        </div>

        {sortedEvents.length > 0 && (
          <OverflowContainer<CalendarEvent>
            className={cssClass(
              oldMonthDay && 'opacity-50',
              'd-flex flex-column gap-2 flex-grow-1 overflow-hidden'
            )}
            items={sortedEvents}
            getKey={(event) => event.id}
            renderItem={(event) => <CalendarEventView event={event} />}
            renderOverflow={(amount) => (
              <>
                <button
                  className="w-100 btn btn-link fw-bold text-dark text-decoration-none p-0"
                  onClick={() => setIsViewMoreEventsModalOpen(true)}
                >
                  +{amount} More
                </button>
                <ViewMoreEventsModal
                  events={sortedEvents}
                  isOpen={isViewMoreEventsModalOpen}
                  onClose={() => setIsViewMoreEventsModalOpen(false)}
                />
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

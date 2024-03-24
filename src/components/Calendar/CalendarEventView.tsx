import { parse } from 'date-fns';
import { CalendarEvent } from '../../models/calendar';
import cssClass from '../../utils/cssClass';
import formatDate from '../../utils/formatDate';

export default function CalendarEventView({ event }: { event: CalendarEvent }) {
  return (
    <>
      {event.allDay ? (
        <button className={cssClass('event', 'all-day-event', event.color)}>
          <div className="event-name">{event.name}</div>
        </button>
      ) : (
        <button className="event">
          <div className={cssClass('color-dot', event.color)}></div>
          <div className="event-time">
            {formatDate(parse(event.startTime, 'HH:mm', event.date), {
              timeStyle: 'short',
            })}
          </div>
          <div className="event-name">{event.name}</div>
        </button>
      )}
    </>
  );
}

import { parse } from 'date-fns';
import { CalendarEvent } from '../../models/calendar';
import cssClass from '../../utils/cssClass';
import formatDate from '../../utils/formatDate';
import useCalendarEvents from '../../hooks/useCalendarEvents';
import { useState } from 'react';
import EventFormModal from './EventFormModal';

export default function CalendarEventView({ event }: { event: CalendarEvent }) {
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const { updateEvent, deleteEvent } = useCalendarEvents();

  return (
    <>
      {event.allDay ? (
        <button
          className={cssClass('event', 'all-day-event', event.color)}
          onClick={() => setIsEditEventModalOpen(true)}
        >
          <div className="event-name">{event.name}</div>
        </button>
      ) : (
        <button className="event" onClick={() => setIsEditEventModalOpen(true)}>
          <div className={cssClass('color-dot', event.color)}></div>
          <div className="event-time">
            {formatDate(parse(event.startTime, 'HH:mm', event.date), {
              timeStyle: 'short',
            })}
          </div>
          <div className="event-name">{event.name}</div>
        </button>
      )}
      <EventFormModal
        isOpen={isEditEventModalOpen}
        event={event}
        onClose={() => setIsEditEventModalOpen(false)}
        onSubmit={(formEvent) => updateEvent(event.id, formEvent)}
        onDelete={() => deleteEvent(event.id)}
      />
    </>
  );
}

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

  const eventClass =
    'w-100 btn d-flex justify-content-start align-items-center overflow-hidden text-nowrap py-0';

  const btnColor = {
    green: 'btn-success',
    red: 'btn-danger',
    blue: 'btn-primary bg-info border-info',
  };

  const dotColor = {
    green: 'bg-success',
    red: 'bg-danger',
    blue: 'bg-info',
  };

  return (
    <>
      {event.allDay ? (
        <button
          className={cssClass(eventClass, 'px-1', btnColor[event.color])}
          onClick={() => setIsEditEventModalOpen(true)}
        >
          <div className="overflow-hidden">{event.name}</div>
        </button>
      ) : (
        <button
          className={cssClass(eventClass, 'px-0')}
          onClick={() => setIsEditEventModalOpen(true)}
        >
          <div
            className={cssClass('color-dot me-1', dotColor[event.color])}
          ></div>
          <div className="text-muted me-1">
            {formatDate(parse(event.startTime, 'HH:mm', event.date), {
              timeStyle: 'short',
            })}
          </div>
          <div className="overflow-hidden">{event.name}</div>
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

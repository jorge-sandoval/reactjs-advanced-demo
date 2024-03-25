import { CalendarEvent } from '../../models/calendar';
import formatDate from '../../utils/formatDate';
import Modal from '../Modal';
import CalendarEventView from './CalendarEventView';

export default function ViewMoreEventsModal({
  events,
  isOpen,
  onClose,
}: {
  events: CalendarEvent[];
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-title">
        <small>{formatDate(events[0].date, { dateStyle: 'short' })}</small>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="events">
        {events.map((event) => (
          <CalendarEventView event={event} key={event.id} />
        ))}
      </div>
    </Modal>
  );
}

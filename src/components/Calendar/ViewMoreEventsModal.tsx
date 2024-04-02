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
      <div className="fs-4 mb-2 d-flex justify-content-between align-items-center">
        <small className="text-dark">
          {formatDate(events[0].date, { dateStyle: 'short' })}
        </small>
        <button className="fs-6 btn-close" onClick={onClose} />
      </div>
      <div className="d-flex flex-column gap-2 flex-grow-1 overflow-hidden">
        {events.map((event) => (
          <CalendarEventView event={event} key={event.id} />
        ))}
      </div>
    </Modal>
  );
}

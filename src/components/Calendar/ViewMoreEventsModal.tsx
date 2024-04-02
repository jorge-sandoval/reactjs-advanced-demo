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
      <Modal.Header>
        <div className="d-flex flex-grow-1 justify-content-between align-items-center fs-4">
          <small className="text-dark">
            {formatDate(events[0].date, { dateStyle: 'short' })}
          </small>
          <button className="fs-6 btn-close ms-0" onClick={onClose} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-2 flex-grow-1 overflow-hidden">
          {events.map((event) => (
            <CalendarEventView event={event} key={event.id} />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

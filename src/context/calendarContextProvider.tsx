import CalendarContext from './calendarContext';
import {
  CalendarContextProviderProps,
  CalendarEvent,
} from '../models/calendar';
import { UnionOmit } from '../utils/types';
import useLocalStorage from '../hooks/useLocalStorage';

export default function CalendarContextProvider({
  children,
}: CalendarContextProviderProps) {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>(
    'MY_CALENDAR_EVENTS',
    []
  );

  const addEvent = (event: UnionOmit<CalendarEvent, 'id'>) => {
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...event, id: crypto.randomUUID() },
    ]);
  };

  const updateEvent = (id: string, event: UnionOmit<CalendarEvent, 'id'>) => {
    setEvents((prevEvents) =>
      prevEvents.map((prevEvent) =>
        prevEvent.id === id ? { ...event, id } : prevEvent
      )
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.filter((prevEvent) => prevEvent.id !== eventId)
    );
  };

  return (
    <CalendarContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

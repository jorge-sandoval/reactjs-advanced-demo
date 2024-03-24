import { useState } from 'react';
import CalendarContext from './calendarContext';
import {
  CalendarContextProviderProps,
  CalendarEvent,
} from '../models/calendar';
import { UnionOmit } from '../utils/types';

export default function CalendarContextProvider({
  children,
}: CalendarContextProviderProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const addEvent = (event: UnionOmit<CalendarEvent, 'id'>) => {
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...event, id: crypto.randomUUID() },
    ]);
  };

  return (
    <CalendarContext.Provider value={{ events, addEvent }}>
      {children}
    </CalendarContext.Provider>
  );
}

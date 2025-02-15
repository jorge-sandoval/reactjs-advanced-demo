import { ReactNode } from "react";
import { UnionOmit } from "../utils/types";
import { ModalProps } from "./modal";

const EVENT_COLORS = ['red', 'blue', 'green'];

export type CalendarEvent = {
  id: string
  name: string
  color: (typeof EVENT_COLORS)[number]
  date: Date
} & (
  {
    allDay: true;
    startTime?: never;
    endTime?: never
  } | {
    allDay: false;
    startTime: string;
    endTime: string;
  }
);

export interface CalendarDayProps {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
  events: CalendarEvent[];
}

export type CalendarEventFormProps = {
  onSubmit: (event: UnionOmit<CalendarEvent, 'id'>) => void;
} & (
  { 
    onDelete: () => void;
    event: CalendarEvent;
    date?: never;
  } | {
    onDelete?: never;
    event?: never;
    date: Date;
  }
) & (
  Omit<ModalProps, 'children'>
);


export interface CalendarContextProps {
  events: CalendarEvent[];
  addEvent: (event: UnionOmit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: UnionOmit<CalendarEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;
}

export interface CalendarContextProviderProps {
  children: ReactNode;
}

export default EVENT_COLORS;
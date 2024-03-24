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
  events?: [];
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

export default EVENT_COLORS;
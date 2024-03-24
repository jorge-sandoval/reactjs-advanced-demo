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

export default EVENT_COLORS;
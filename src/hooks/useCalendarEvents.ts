import { useContext } from "react";
import CalendarContext from "../context/calendarContext";

export default function useCalendarEvents() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useEvents must be used within a CalendarContextProvider');
  }
  return context;
}
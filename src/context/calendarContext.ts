import { createContext } from "react";
import { CalendarContextProps } from "../models/calendar";

const CalendarContext = createContext<CalendarContextProps | null>(null);

export default CalendarContext;
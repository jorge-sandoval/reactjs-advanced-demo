import { parseISO } from "date-fns";

type ValueTypes = string | number | boolean | Date | Record<string, unknown> | Array<unknown>;

export default function parseStoredValue<T>(val: unknown): T {
  if (typeof val === 'string') {
    const parsedDate = parseISO(val);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate as T;
    }
  } else if (Array.isArray(val)) {
    return val.map((item) => parseStoredValue(item)) as T;
  } else if (typeof val === 'object' && val !== null) {
    const parsedObj: Record<string, ValueTypes> = {};
    Object.keys(val).forEach(key => {
      parsedObj[key] = parseStoredValue(val[key]);
    });
    return parsedObj as T;
  }
  return val as T;
}
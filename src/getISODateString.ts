import type { DateInput, ISODateString } from './types/date-time.js';

export const getISODateString = (value: DateInput = new Date()): ISODateString =>
  (value instanceof Date ? value : new Date(value)).toISOString() as ISODateString;

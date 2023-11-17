import type { Branded } from './types/branded.js';
import type { DateInput, DateString, TimeString } from './types/date-time.js';

export type ISODateString = Branded<`${DateString}T${TimeString}.${number}Z`, 'ISODateString'>;

export const getISODateString = (value: DateInput = new Date()): ISODateString =>
  (value instanceof Date ? value : new Date(value)).toISOString() as ISODateString;

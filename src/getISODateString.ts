import type { ISODateString } from './types/date-time.js';

export const getISODateString = (value: ConstructorParameters<typeof Date>[0] = new Date()): ISODateString =>
  (value instanceof Date ? value : new Date(value)).toISOString() as ISODateString;

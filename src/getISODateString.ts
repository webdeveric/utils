import type { DateInput, ISODateString } from './types/date-time.js';

/**
 * Convert `value` to an ISO 8601 date string.
 *
 * @example
 * ```ts
 * getISODateString(new Date('2024-01-15T10:30:00Z')); // '2024-01-15T10:30:00.000Z'
 * ```
 */
export const getISODateString = (value: DateInput = new Date()): ISODateString =>
  (value instanceof Date ? value : new Date(value)).toISOString() as ISODateString;

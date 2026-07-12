import { getISODateString } from './getISODateString.js';

import type { DateInput, DateString } from './types/date-time.js';

/**
 * Get the date portion (`YYYY-MM-DD`) of `value` as a date string.
 *
 * @example
 * ```ts
 * getDateString(new Date('2024-01-15T10:30:00Z')); // '2024-01-15'
 * ```
 */
export const getDateString = (value: DateInput = new Date()): DateString =>
  getISODateString(value).split('T')[0] as DateString;

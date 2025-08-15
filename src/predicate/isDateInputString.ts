import type { DateInputString } from '../types/date-time.js';
import type { TypePredicateFn } from '../types/functions.js';

/**
 * Determine if `input` is a valid date string.
 */
export const isDateInputString: TypePredicateFn<DateInputString> = (input: unknown): input is DateInputString =>
  typeof input === 'string' && !Number.isNaN(Date.parse(input));

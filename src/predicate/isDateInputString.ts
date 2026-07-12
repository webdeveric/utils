import type { DateInputString } from '../types/date-time.js';
import type { TypePredicateFn } from '../types/functions.js';

/**
 * Determine if `input` is a valid date string.
 *
 * @example
 * ```ts
 * isDateInputString('2024-01-01'); // true
 * isDateInputString('not a date'); // false
 * ```
 */
export const isDateInputString: TypePredicateFn<DateInputString> = (input: unknown): input is DateInputString =>
  typeof input === 'string' && !Number.isNaN(Date.parse(input));

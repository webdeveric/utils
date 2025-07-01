import type { TypePredicateFn } from '../types/functions.js';

/**
 * Determine if `input` is a valid date string.
 */
export const isDateString: TypePredicateFn<string> = (input: unknown): input is string =>
  typeof input === 'string' && !Number.isNaN(Date.parse(input));

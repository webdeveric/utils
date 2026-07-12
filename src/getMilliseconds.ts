import { isInteger } from './predicate/isInteger.js';

/**
 * Get the number of milliseconds represented by `input`.
 *
 * @example
 * ```ts
 * getMilliseconds(1000); // 1000
 * getMilliseconds(new Date(0)); // 0
 * ```
 */
export const getMilliseconds = (input: string | number | Date): number =>
  input instanceof Date ? input.getTime() : isInteger(input) ? input : Date.parse(input);

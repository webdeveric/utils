import { isObject } from './isObject.js';
import { isStringArray } from './isStringArray.js';

import type { StringRecord } from '../types/records.js';

/**
 * Determine if `input` is an object whose values are all arrays of strings.
 *
 * @example
 * ```ts
 * isStringRecord({ a: 'x', b: 'y' }); // true
 * isStringRecord({ a: 1 }); // false
 * ```
 */
export const isStringRecord = (input: unknown): input is StringRecord => {
  return isObject(input) && Object.entries(input).every(isStringArray);
};

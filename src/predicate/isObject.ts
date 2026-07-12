import type { UnknownRecord } from '../types/records.js';

/**
 * Determine if `input` is a non-null object and not an array.
 *
 * @example
 * ```ts
 * isObject({}); // true
 * isObject([]); // false
 * ```
 */
export const isObject = (input: unknown): input is UnknownRecord =>
  input !== null && typeof input === 'object' && !Array.isArray(input);

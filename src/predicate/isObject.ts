import type { UnknownRecord } from '../types/records.js';

/**
 * Determine if `input` is a non-null object and not an array.
 */
export const isObject = <T>(input: T): input is T & UnknownRecord =>
  input !== null && typeof input === 'object' && !Array.isArray(input);

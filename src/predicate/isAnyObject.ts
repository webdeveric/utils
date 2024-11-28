import type { UnknownRecord } from '../types/records.js';

/**
 * Determine if `input` is any non-null object.
 */
export const isAnyObject = <T>(input: T): input is T & UnknownRecord => input !== null && typeof input === 'object';

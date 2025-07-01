import type { UnknownRecord } from '../types/records.js';

/**
 * Determine if `input` is an object literal.
 */
export const isObjectLiteral = (input: unknown): input is UnknownRecord =>
  input !== null && typeof input === 'object' && Object.getPrototypeOf(input) === Object.prototype;

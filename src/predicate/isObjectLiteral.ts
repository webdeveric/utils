import type { UnknownRecord } from '../types/records.js';

/**
 * Determine if `input` is an object literal.
 *
 * @example
 * ```ts
 * isObjectLiteral({ a: 1 }); // true
 * isObjectLiteral(new Map()); // false
 * ```
 */
export const isObjectLiteral = (input: unknown): input is UnknownRecord =>
  input !== null && typeof input === 'object' && Object.getPrototypeOf(input) === Object.prototype;

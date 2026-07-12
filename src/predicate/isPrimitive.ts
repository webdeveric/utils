import type { Primitive } from '../types/common.js';

/**
 * Determine if `input` is a primitive value, i.e. `null`, a string, number, bigint, boolean, `undefined`, or symbol.
 *
 * @example
 * ```ts
 * isPrimitive('hello'); // true
 * isPrimitive({}); // false
 * ```
 */
export const isPrimitive = (input: unknown): input is Primitive =>
  input === null ||
  typeof input === 'string' ||
  typeof input === 'number' ||
  typeof input === 'bigint' ||
  typeof input === 'boolean' ||
  typeof input === 'undefined' ||
  typeof input === 'symbol';

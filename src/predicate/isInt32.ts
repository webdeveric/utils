import { int32Max, int32Min } from '../numbers.js';

import type { Int32 } from '../types/numbers.js';

/**
 * Determine if `input` is an integer within the 32-bit signed integer range.
 *
 * @example
 * ```ts
 * isInt32(42); // true
 * isInt32(2 ** 32); // false
 * ```
 */
export function isInt32(input: unknown): input is Int32 {
  return typeof input === 'number' && Number.isInteger(input) && input >= int32Min && input <= int32Max;
}

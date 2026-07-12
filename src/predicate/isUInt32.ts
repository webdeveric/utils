import { uInt32Max, uInt32Min } from '../numbers.js';

import type { UInt32 } from '../types/numbers.js';

/**
 * Determine if `input` is an integer within the unsigned 32-bit integer range.
 *
 * @example
 * ```ts
 * isUInt32(42); // true
 * isUInt32(-1); // false
 * ```
 */
export function isUInt32(input: unknown): input is UInt32 {
  return typeof input === 'number' && Number.isInteger(input) && input >= uInt32Min && input <= uInt32Max;
}

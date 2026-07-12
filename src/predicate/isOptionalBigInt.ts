import { optional } from './factory/optional.js';
import { isBigInt } from './isBigInt.js';

/**
 * Determine if `input` is `undefined` or a bigint.
 *
 * @example
 * ```ts
 * isOptionalBigInt(undefined); // true
 * isOptionalBigInt(null); // false
 * ```
 */
export const isOptionalBigInt = optional(isBigInt);

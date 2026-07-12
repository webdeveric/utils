import { parseNumber } from '../parseNumber.js';

/**
 * Compare two numeric-like values by parsing them and subtracting `right` from `left`.
 *
 * @example
 * ```ts
 * [10, 2, 1].sort(bySubtraction); // [1, 2, 10]
 * ```
 */
export const bySubtraction = <T extends number | bigint | string>(left: T, right: T): number =>
  parseNumber(left) - parseNumber(right);

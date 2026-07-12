import { isBigInt } from './predicate/isBigInt.js';
import { isNumber } from './predicate/isNumber.js';

/**
 * Convert `input` to a number.
 *
 * @example
 * ```ts
 * parseNumber('42'); // 42
 * parseNumber(42n); // 42
 * ```
 */
export const parseNumber = (input: bigint | number | string): number =>
  isNumber(input) ? input : isBigInt(input) ? Number.parseInt(input.toString()) : Number.parseFloat(input);

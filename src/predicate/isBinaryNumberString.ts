import { matching } from './factory/matching.js';

import type { BinaryNumberString } from '../types/numbers.js';

/**
 * Determine if `input` is a binary number string.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#binary_numbers}
 *
 * @example
 * ```ts
 * isBinaryNumberString('0b1010'); // true
 * isBinaryNumberString('1010'); // false
 * ```
 */
export const isBinaryNumberString = matching<BinaryNumberString>(/^0b[01]+$/i);

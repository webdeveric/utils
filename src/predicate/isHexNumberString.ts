import { matching } from './factory/matching.js';

import type { HexNumberString } from '../types/numbers.js';

/**
 * Determine if `input` is a hexadecimal number string.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#hexadecimal_numbers}
 *
 * @example
 * ```ts
 * isHexNumberString('0xff'); // true
 * isHexNumberString('ff'); // false
 * ```
 */
export const isHexNumberString = matching<HexNumberString>(/^0x[0-9a-f]+$/i);

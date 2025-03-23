import { matching } from './factory/matching.js';

import type { HexNumberString } from '../types/numbers.js';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#hexadecimal_numbers
 */
export const isHexNumberString = matching<HexNumberString>(/^0x[0-9a-f]+$/i);

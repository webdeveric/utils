import { matching } from './factory/matching.js';

import type { BinaryNumberString } from '../types/numbers.js';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#binary_numbers
 */
export const isBinaryNumberString = matching<BinaryNumberString>(/^0b[01]+$/i);

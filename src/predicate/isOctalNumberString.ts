import { matching } from './factory/matching.js';

import type { OctalNumberString } from '../types/numbers.js';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#octal_numbers
 */
export const isOctalNumberString = matching<OctalNumberString>(/^0o[0-7]+$/i);

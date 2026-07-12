import { matching } from './factory/matching.js';

import type { NumericString } from '../types/common.js';

/**
 * Determine if `input` is a string containing only digits.
 *
 * @example
 * ```ts
 * isDigitsString('12345'); // true
 * isDigitsString('12a45'); // false
 * ```
 */
export const isDigitsString = matching<NumericString>(/^\d+$/);

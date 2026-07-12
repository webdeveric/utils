import { matching } from './factory/matching.js';

import type { NumericString } from '../types/common.js';

/**
 * Determine if `input` is a string representing a numeric value, including optional sign and decimal point.
 *
 * @example
 * ```ts
 * isNumericString('-42.5'); // true
 * isNumericString('42a'); // false
 * ```
 */
export const isNumericString = matching<NumericString>(/^[-+]?(\d+(\.\d+)?|\.\d+)$/);

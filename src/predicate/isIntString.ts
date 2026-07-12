import { matching } from './factory/matching.js';

import type { NumericString } from '../types/common.js';

/**
 * Determine if `input` is a string representing an integer.
 *
 * @example
 * ```ts
 * isIntString('42'); // true
 * isIntString('4.2'); // false
 * ```
 */
export const isIntString = matching<NumericString>(/^[-+]?\d+$/);

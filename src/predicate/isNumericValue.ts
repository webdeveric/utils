import { isNumericString } from './isNumericString.js';

import type { NumericValue } from '../types/common.js';

/**
 * Determine if `input` is a number, a bigint, or a numeric string.
 *
 * @example
 * ```ts
 * isNumericValue('42'); // true
 * isNumericValue('abc'); // false
 * ```
 */
export const isNumericValue = (input: unknown): input is NumericValue =>
  (typeof input === 'number' && !Number.isNaN(input)) || typeof input === 'bigint' || isNumericString(input);

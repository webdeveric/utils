import { optional } from './factory/optional.js';
import { isISODateString } from './isISODateString.js';

/**
 * Determine if `input` is `undefined` or an ISO date string.
 *
 * @example
 * ```ts
 * isOptionalISODateString(undefined); // true
 * isOptionalISODateString('2024-01-01'); // false
 * ```
 */
export const isOptionalISODateString = optional(isISODateString);

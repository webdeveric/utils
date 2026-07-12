import { optional } from './factory/optional.js';
import { isNull } from './isNull.js';

/**
 * Determine if `input` is `undefined` or `null`.
 *
 * @example
 * ```ts
 * isOptionalNull(undefined); // true
 * isOptionalNull(0); // false
 * ```
 */
export const isOptionalNull = optional(isNull);

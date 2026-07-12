import { trimEnd } from './trimEnd.js';
import { trimStart } from './trimStart.js';

/**
 * Join `left` and `right` with `separator`, without duplicating the separator at the seam.
 *
 * @example
 * ```ts
 * joinStrings('a/', '/b'); // 'a/b'
 * ```
 */
export function joinStrings(left: string, right: string, separator = '/'): string {
  return trimEnd(left, separator) + separator + trimStart(right, separator);
}

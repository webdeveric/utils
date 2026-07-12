import { matching } from './factory/matching.js';

import type { ISODateString } from '../types/date-time.js';

export const ISO_DATE_PATTERN =
  /^(?<year>\d{4,})-(?<month>[01]\d)-(?<day>0[1-9]|[12]\d|3[01])T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})\.(?<timezone>\d+Z)$/;

/**
 * This checks to see if the input matches the format that `toISOString()`
 * returns, which is a simplified format based on ISO 8601.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString}
 *
 * @example
 * ```ts
 * isISODateString('2024-01-01T00:00:00.000Z'); // true
 * isISODateString('2024-01-01'); // false
 * ```
 */
export const isISODateString = matching<ISODateString>(ISO_DATE_PATTERN);

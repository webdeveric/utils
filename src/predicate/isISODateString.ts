import { matching } from './factory/matching.js';

import type { ISODateString } from '../types/date-time.js';

export const ISO_DATE_PATTERN =
  /^(?<year>\d{4,})-(?<month>[01]\d)-(?<day>0[1-9]|[12]\d|3[01])T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})\.(?<timezone>\d{3}Z)$/;

/**
 * This checks to see if the input matches the format that `toISOString()`
 * returns, which is a simplified format based on ISO 8601.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
 */
export const isISODateString = matching<ISODateString>(ISO_DATE_PATTERN);

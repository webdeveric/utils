import { matching } from './factory/matching.js';

import type { ISODateString } from '../types/date-time.js';

export const ISO_DATE_PATTERN =
  /^(?<year>[+-]?\d{4,})-(?<month>[01]\d)-(?<day>0[1-9]|[12]\d|3[01])T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})(\.(?<timezone>\d{3}Z))?$/;

export const isISODateString = matching<ISODateString>(ISO_DATE_PATTERN);

import { getISODateString } from './getISODateString.js';

import type { DateInput, DateString } from './types/date-time.js';

export const getDateString = (value: DateInput = new Date()): DateString =>
  getISODateString(value).split('T')[0] as DateString;

import { isNumericString } from './isNumericString.js';

import type { NumericValue } from '../types/common.js';

export const isNumericValue = (input: unknown): input is NumericValue =>
  typeof input === 'number' || typeof input === 'bigint' || isNumericString(input);

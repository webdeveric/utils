import { getMaxValue } from './getMaxValue.js';
import { getMinValue } from './getMinValue.js';

import type { NumericValue } from './types.js';

export function clamp<T extends NumericValue>(min: T, value: T, max: T): T {
  return getMaxValue<T>(min, getMinValue<T>(value, max));
}

import { getMaxValue } from './getMaxValue.js';
import { getMinValue } from './getMinValue.js';
import type { NumericValue } from './types.js';

export function clamp(min: NumericValue, value: NumericValue, max: NumericValue): NumericValue {
  return getMaxValue(min, getMinValue(value, max));
}

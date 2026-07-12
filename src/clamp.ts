import { getMaxValue } from './getMaxValue.js';
import { getMinValue } from './getMinValue.js';

import type { NumericValue } from './types/common.js';

/**
 * Clamp `value` so it falls between `min` and `max`.
 *
 * @example
 * ```ts
 * clamp(0, 15, 10); // 10
 * clamp(0, -5, 10); // 0
 * ```
 */
export function clamp<T extends NumericValue>(min: T, value: T, max: T): T {
  return getMaxValue<T>(min, getMinValue<T>(value, max));
}

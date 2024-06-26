import { assertIsNumericValueArray } from './assertion/assertIsNumericValueArray.js';

import type { NumericValue } from './types/common.js';

export function getMinValue<T extends NumericValue>(...values: [T, ...T[]]): T {
  if (values.length === 0) {
    throw new Error('Expected at least one numeric value');
  }

  assertIsNumericValueArray(values);

  return values.reduce((low, current) => {
    const lowValue = typeof low === 'string' ? Number(low) : low;
    const currentValue = typeof current === 'string' ? Number(current) : current;

    return currentValue < lowValue ? current : low;
  });
}

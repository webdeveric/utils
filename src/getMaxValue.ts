import { assertIsNumericValueArray } from './type-assertion.js';

import type { NumericValue } from './types.js';

export function getMaxValue(...values: [NumericValue, ...NumericValue[]]): NumericValue {
  if (values.length === 0) {
    throw new Error('Expected at least one numeric value');
  }

  assertIsNumericValueArray(values);

  return values.reduce((high, current) => {
    const highValue = typeof high === 'string' ? Number(high) : high;
    const currentValue = typeof current === 'string' ? Number(current) : current;

    return currentValue > highValue ? current : high;
  });
}

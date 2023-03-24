import { assertIsNumericValueArray } from './type-assertion.js';

import type { NumericValue } from './types.js';

export function getMinValue(...values: [NumericValue, ...NumericValue[]]): NumericValue {
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

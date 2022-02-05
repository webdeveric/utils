import type { NumericValue } from './types';

export function getMaxValue(...values: NumericValue[]): NumericValue {
  if (values.length === 0) {
    throw new Error('Expected at least one numeric value');
  }

  return values.reduce(
    (high: NumericValue, current: NumericValue) => {
      const value = typeof current === 'string' ? Number(current) : current;

      return value > high ? current : high;
    },
    values[ 0 ],
  );
}

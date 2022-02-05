import type { NumericValue } from './types';

export function getMinValue(...values: NumericValue[]): NumericValue {
  if (values.length === 0) {
    throw new Error('Expected at least one numeric value');
  }

  return values.reduce(
    (low: NumericValue, current: NumericValue) => {
      const value = typeof current === 'string' ? Number(current) : current;

      return value < low ? current : low;
    },
    values[ 0 ],
  );
}

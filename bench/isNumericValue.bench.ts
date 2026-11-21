import { test } from 'vitest';

import { isNumericValue } from '../src/predicate/isNumericValue.js';

const simpleNumber = 123.456;
const maxSafeInt = Number.MAX_SAFE_INTEGER;
const bigIntValue = BigInt(Number.MAX_VALUE) + BigInt(Number.MAX_VALUE);
const stringifiedMaxInt = String(maxSafeInt);
const stringifiedBigInt = String(bigIntValue);

test('isNumericValue()', async ({ bench }) => {
  await bench.compare(
    bench('simple decimal numbers', () => {
      isNumericValue(simpleNumber);
    }),
    bench('Number.MAX_SAFE_INTEGER', () => {
      isNumericValue(maxSafeInt);
    }),
    bench('bigint', () => {
      isNumericValue(bigIntValue);
    }),
    bench('stringified Number.MAX_SAFE_INTEGER', () => {
      isNumericValue(stringifiedMaxInt);
    }),
    bench('stringified BigInt', () => {
      isNumericValue(stringifiedBigInt);
    }),
  );
});

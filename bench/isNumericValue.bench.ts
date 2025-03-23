import { bench } from 'vitest';

import { isNumericValue } from '../src/predicate/isNumericValue.js';

const simpleNumber = 123.456;
const maxSafeInt = Number.MAX_SAFE_INTEGER;
const bigIntValue = BigInt(Number.MAX_VALUE) + BigInt(Number.MAX_VALUE);
const stringifiedMaxInt = String(maxSafeInt);
const stringifiedBigInt = String(bigIntValue);

bench('isNumericValue() - simple decimal numbers', () => {
  isNumericValue(simpleNumber);
});

bench('isNumericValue() - Number.MAX_SAFE_INTEGER', () => {
  isNumericValue(maxSafeInt);
});

bench('isNumericValue() - bigint', () => {
  isNumericValue(bigIntValue);
});

bench('isNumericValue() - stringified Number.MAX_SAFE_INTEGER', () => {
  isNumericValue(stringifiedMaxInt);
});

bench('isNumericValue() - stringified BigInt', () => {
  isNumericValue(stringifiedBigInt);
});

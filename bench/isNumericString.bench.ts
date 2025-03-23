import { bench } from 'vitest';

import { isNumericString } from '../src/predicate/isNumericString.js';

const numberValue = Number.MAX_SAFE_INTEGER;
const bigIntValue = BigInt(Number.MAX_VALUE) + BigInt(Number.MAX_VALUE);
const stringValue = String(numberValue);
const bigIntStringValue = String(bigIntValue);

bench('isNumericString() - number', () => {
  isNumericString(numberValue);
});

bench('isNumericString() - bigint', () => {
  isNumericString(bigIntValue);
});

bench('isNumericString() - stringified number', () => {
  isNumericString(stringValue);
});

bench('isNumericString() - stringified bigint', () => {
  isNumericString(bigIntStringValue);
});

import { test } from 'vitest';

import { isNumericString } from '../src/predicate/isNumericString.js';

const numberValue = Number.MAX_SAFE_INTEGER;
const bigIntValue = BigInt(Number.MAX_VALUE) + BigInt(Number.MAX_VALUE);
const stringValue = String(numberValue);
const bigIntStringValue = String(bigIntValue);

test('isNumericString()', async ({ bench }) => {
  await bench.compare(
    bench('number', () => {
      isNumericString(numberValue);
    }),
    bench('bigint', () => {
      isNumericString(bigIntValue);
    }),
    bench('stringified number', () => {
      isNumericString(stringValue);
    }),
    bench('stringified bigint', () => {
      isNumericString(bigIntStringValue);
    }),
  );
});

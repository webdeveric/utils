import { describe, it, expect } from 'vitest';

import { uInt32Min, uInt32Max } from '../../src/numbers.js';
import { isUInt32 } from '../../src/predicate/isUInt32.js';

describe('isUInt32()', () => {
  it.each([0, 1234, uInt32Min, uInt32Max])('Returns true for valid input', (value) => {
    expect(isUInt32(value)).toBeTruthy();
  });

  it.each([null, undefined, Number.MAX_SAFE_INTEGER, -1])('Returns false for invalid input', (value) => {
    expect(isUInt32(value)).toBeFalsy();
  });

  it('Can be used with Array.filter()', () => {
    expect([-1, 0, null, 2, undefined, 4, Number.MAX_SAFE_INTEGER, Number.POSITIVE_INFINITY].filter(isUInt32)).toEqual([
      0, 2, 4,
    ]);
  });
});

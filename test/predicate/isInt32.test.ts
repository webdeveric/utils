import { describe, it, expect } from 'vitest';

import { isInt32 } from '../../src/predicate/isInt32.js';

describe('isInt32()', () => {
  it('Returns true for valid input', () => {
    expect(isInt32(1234)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isInt32(null)).toBeFalsy();
    expect(isInt32(undefined)).toBeFalsy();
    expect(isInt32(Number.MAX_SAFE_INTEGER)).toBeFalsy();
  });

  it('Can be used with Array.filter()', () => {
    expect([-1, 0, null, 2, undefined, 4, Number.MAX_SAFE_INTEGER, Number.POSITIVE_INFINITY].filter(isInt32)).toEqual([
      -1, 0, 2, 4,
    ]);
  });
});

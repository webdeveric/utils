import { describe, it, expect } from 'vitest';

import { isNonNullable } from '../../src/predicate/isNonNullable.js';

describe('isNonNullable()', () => {
  it('Returns true for valid input', () => {
    expect(isNonNullable('string-key')).toBeTruthy();
    expect(isNonNullable(123)).toBeTruthy();
    expect(isNonNullable(Symbol('symbol-key'))).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isNonNullable(null)).toBeFalsy();
    expect(isNonNullable(undefined)).toBeFalsy();
  });

  it('Can be used with Array.filter()', () => {
    expect([1, null, 2, undefined, 3].filter(isNonNullable)).toEqual([1, 2, 3]);
  });
});

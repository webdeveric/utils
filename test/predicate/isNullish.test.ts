import { describe, it, expect } from 'vitest';

import { isNullish } from '../../src/predicate/isNullish.js';

describe('isNullish()', () => {
  it('Returns true for valid input', () => {
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(null)).toBe(true);
  });

  it('Returns false for invalid input', () => {
    expect(isNullish('abc123')).toBe(false);
    expect(isNullish([])).toBe(false);
  });

  it('Can be used with Array.filter()', () => {
    expect([1, null, 2, undefined, 3].filter(isNullish)).toEqual([null, undefined]);
  });
});

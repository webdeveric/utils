import { describe, it, expect } from 'vitest';

import { isArray } from '../../src/predicate/isArray.js';

describe('isArray()', () => {
  it('Returns true for valid inputs', () => {
    expect(isArray([1, 2, 3])).toBeTruthy();
    expect(isArray(null)).toBeFalsy();
    expect(isArray({})).toBeFalsy();
  });
});

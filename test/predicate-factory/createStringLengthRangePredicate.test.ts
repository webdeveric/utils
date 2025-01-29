import { describe, it, expect } from 'vitest';

import { createStringLengthRangePredicate } from '../../src/predicate-factory/createStringLengthRangePredicate.js';

describe('createStringLengthRangePredicate()', () => {
  it('Returns a type predicate function', () => {
    const fn = createStringLengthRangePredicate(1, 10);

    expect(fn).toBeInstanceOf(Function);
    expect(fn('a')).toBeTruthy();
    expect(fn('')).toBeFalsy();
    expect(fn(undefined)).toBeFalsy();
    expect(fn('a'.repeat(20))).toBeFalsy();
  });

  it('Max is optional', () => {
    const fn = createStringLengthRangePredicate(1);

    expect(fn('a'.repeat(20))).toBeTruthy();
  });

  it('Min must be >= 0', () => {
    expect(() => createStringLengthRangePredicate(-1)).toThrow(RangeError);
  });
});

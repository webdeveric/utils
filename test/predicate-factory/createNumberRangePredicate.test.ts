import { describe, it, expect } from 'vitest';

import { createNumberRangePredicate } from '../../src/predicate-factory/createNumberRangePredicate.js';

describe('createNumberRangePredicate()', () => {
  it('Returns a type predicate function', () => {
    const fn = createNumberRangePredicate(1, 10);

    expect(fn).toBeInstanceOf(Function);
    expect(fn(1)).toBeTruthy();
    expect(fn(11)).toBeFalsy();
    expect(fn('')).toBeFalsy();
    expect(fn(undefined)).toBeFalsy();
  });

  it('Max is optional', () => {
    const fn = createNumberRangePredicate(1);

    expect(fn(1)).toBeTruthy();
    expect(fn(Number.POSITIVE_INFINITY)).toBeTruthy();
    expect(fn(Number.NEGATIVE_INFINITY)).toBeFalsy();
  });

  it.each([
    [1, Number.NaN],
    [Number.NaN, 10],
    [Number.NaN, Number.NaN],
    [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
    [10, 1],
    [1, 1],
  ])('Invalid ranges throw - min: %o max: %o', (min, max) => {
    expect(() => createNumberRangePredicate(min, max)).toThrowError();
  });
});

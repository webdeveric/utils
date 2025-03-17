import { describe, it, expect } from 'vitest';

import { range } from '../../../src/predicate/factory/range.js';

describe('range()', () => {
  const fn = range(1, 4);

  it('Returns a type predicate function', () => {
    expect(fn).toBeInstanceOf(Function);
  });

  it.each([1, 2, 3, 4])('Returns true for input in range: %d', (input) => {
    expect(fn(input)).toBeTruthy();
  });

  it.each([0, 5, Number.POSITIVE_INFINITY, Number.NaN, 'test', false, null])(
    'Returns false for input not in range: %s',
    (input) => {
      expect(fn(input)).toBeFalsy();
    },
  );

  it.each([
    [1, Number.NaN],
    [Number.NaN, 10],
    [Number.NaN, Number.NaN],
    [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
    [10, 1],
    [1, 1],
  ])('Invalid ranges throw - min: %o max: %o', (min, max) => {
    expect(() => range(min, max)).toThrowError();
  });
});

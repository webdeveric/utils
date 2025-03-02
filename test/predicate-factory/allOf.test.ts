import { describe, it, expect } from 'vitest';

import { isNumber } from '../../src/predicate/isNumber.js';
import { isString } from '../../src/predicate/isString.js';
import { allOf } from '../../src/predicate-factory/allOf.js';
import { createObjectShapePredicate } from '../../src/predicate-factory/createObjectShapePredicate.js';

describe('allOf()', () => {
  it('Requires one or more type predicate function', () => {
    expect(() => allOf()).toThrow();
  });

  it('Returns a type predicate function', () => {
    const fn = allOf(
      createObjectShapePredicate({
        name: isString,
      }),
      createObjectShapePredicate({
        age: isNumber,
      }),
    );

    expect(fn).instanceOf(Function);

    expect(
      fn({
        name: 'test',
        age: 100,
      }),
    ).toBeTruthy();

    expect(
      fn({
        name: 'test',
      }),
    ).toBeFalsy();
  });
});

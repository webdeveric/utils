import { describe, it, expect } from 'vitest';

import { allOf } from '../../../src/predicate/factory/allOf.js';
import { shape } from '../../../src/predicate/factory/shape.js';
import { isNumber } from '../../../src/predicate/isNumber.js';
import { isString } from '../../../src/predicate/isString.js';

describe('allOf()', () => {
  it('Requires one or more type predicate function', () => {
    expect(() => {
      // @ts-expect-error testing missing arguments
      allOf();
    }).toThrow();
  });

  it('Returns a type predicate function', () => {
    const fn = allOf(
      shape({
        name: isString,
      }),
      shape({
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

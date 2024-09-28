import { describe, it, expect } from 'vitest';

import { isNumber } from '../../src/predicate/isNumber.js';
import { isObject } from '../../src/predicate/isObject.js';
import { isString } from '../../src/predicate/isString.js';
import { allOf } from '../../src/predicate-factory/allOf.js';

describe('allOf()', () => {
  it('Requires one or more type predicate function', () => {
    expect(() => allOf()).toThrow();
  });

  it('Returns a type predicate function', () => {
    const fn = allOf(
      (input): input is { name: string } => {
        return isObject(input) && isString(input.name);
      },
      (input): input is { age: number } => {
        return isObject(input) && isNumber(input.age);
      },
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

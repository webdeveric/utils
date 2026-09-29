import { describe, it, expect } from 'vitest';

import { isAnyObjectWith } from '../../src/predicate/isAnyObjectWith.js';

describe('isAnyObjectWith()', () => {
  it('Returns true for valid inputs', () => {
    expect(isAnyObjectWith({ property: true }, ['property'])).toBeTruthy();
    expect(isAnyObjectWith({ name: 'Test Testerson', age: 100 }, ['name', 'age'])).toBeTruthy();
    expect(isAnyObjectWith(['item'], ['length'])).toBeTruthy();
  });

  it('Accepts a single property', () => {
    expect(isAnyObjectWith({ a: 1 }, 'a')).toBeTruthy();
    expect(isAnyObjectWith({ a: 1 }, 'b')).toBeFalsy();
    expect(isAnyObjectWith(['a'], 0)).toBeTruthy();
    expect(isAnyObjectWith(['a'], 1)).toBeFalsy();

    const symbol = Symbol();

    expect(isAnyObjectWith({ [symbol]: true }, symbol)).toBeTruthy();
    expect(isAnyObjectWith({}, symbol)).toBeFalsy();
  });

  it('Requires every property when given an array', () => {
    expect(isAnyObjectWith({ a: 1, b: 2 }, ['a', 'b'])).toBeTruthy();
    expect(isAnyObjectWith({ a: 1 }, ['a', 'b'])).toBeFalsy();
  });

  it('Returns true for an empty array of properties', () => {
    expect(isAnyObjectWith({}, [])).toBeTruthy();
  });

  it('Includes inherited properties', () => {
    expect(isAnyObjectWith({}, 'toString')).toBeTruthy();
    expect(isAnyObjectWith(Object.setPrototypeOf({}, { property: true }), 'property')).toBeTruthy();
  });

  it('Includes properties with undefined values', () => {
    expect(isAnyObjectWith({ property: undefined }, 'property')).toBeTruthy();
  });

  it.each([null, undefined, false, 'string', Math.PI, Symbol(), () => {}])(
    'Returns false for invalid inputs',
    (item) => {
      expect(isAnyObjectWith(item, ['property'])).toBeFalsy();
      expect(isAnyObjectWith(item, 'property')).toBeFalsy();
    },
  );
});

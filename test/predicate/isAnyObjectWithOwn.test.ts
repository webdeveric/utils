import { describe, it, expect } from 'vitest';

import { isAnyObjectWithOwn } from '../../src/predicate/isAnyObjectWithOwn.js';

describe('isAnyObjectWithOwn()', () => {
  it('Returns true for valid inputs', () => {
    expect(isAnyObjectWithOwn({ property: true }, 'property')).toBeTruthy();
    expect(isAnyObjectWithOwn({ name: 'Test Testerson', age: 100 }, ['name', 'age'])).toBeTruthy();
    expect(isAnyObjectWithOwn(['item'], 'length')).toBeTruthy();
  });

  it.each([
    null,
    false,
    'string',
    Math.PI,
    Symbol(),
    Object.setPrototypeOf(
      {},
      {
        property: true,
      },
    ),
  ])('Returns false for invalid inputs', (item) => {
    expect(isAnyObjectWithOwn(item, 'property')).toBeFalsy();
    expect(isAnyObjectWithOwn(item, ['property'])).toBeFalsy();
  });
});

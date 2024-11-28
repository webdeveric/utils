import { describe, it, expect } from 'vitest';

import { isAnyObjectWith } from '../../src/predicate/isAnyObjectWith.js';

describe('isAnyObjectWith()', () => {
  it('Returns true for valid inputs', () => {
    expect(isAnyObjectWith({ property: true }, 'property')).toBeTruthy();
    expect(isAnyObjectWith({ name: 'Test Testerson', age: 100 }, ['name', 'age'])).toBeTruthy();
    expect(isAnyObjectWith(['item'], 'length')).toBeTruthy();
  });

  it.each([null, false, 'string', Math.PI, Symbol()])('Returns false for invalid inputs', (item) => {
    expect(isAnyObjectWith(item, 'property')).toBeFalsy();
    expect(isAnyObjectWith(item, ['property'])).toBeFalsy();
  });
});

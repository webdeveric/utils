import { describe, it, expect } from 'vitest';

import { isObjectWith } from '../../src/predicate/isObjectWith.js';

describe('isObjectWith()', () => {
  it('Returns true for valid inputs', () => {
    expect(isObjectWith({ property: true }, 'property')).toBeTruthy();
    expect(isObjectWith({ name: 'Test Testerson', age: 100 }, ['name', 'age'])).toBeTruthy();
  });

  it.each([[], null, false, 'string', Math.PI, Symbol()])('Returns false for invalid inputs', (item) => {
    expect(isObjectWith(item, 'property')).toBeFalsy();
    expect(isObjectWith(item, ['property'])).toBeFalsy();
  });
});

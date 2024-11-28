import { describe, it, expect } from 'vitest';

import { isObject } from '../../src/predicate/isObject.js';

describe('isObject()', () => {
  it.each([{}, new Object(), new Date()])('Returns true for valid inputs', (item) => {
    expect(isObject(item)).toBeTruthy();
  });

  it.each([null, false, 'string', Math.PI, Symbol(), undefined, []])('Returns false for invalid inputs', (item) => {
    expect(isObject(item)).toBeFalsy();
  });
});

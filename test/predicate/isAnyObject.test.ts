import { describe, it, expect } from 'vitest';

import { isAnyObject } from '../../src/predicate/isAnyObject.js';

describe('isAnyObject()', () => {
  it.each([{}, [], new Object(), new Date()])('Returns true for valid inputs', (item) => {
    expect(isAnyObject(item)).toBeTruthy();
  });

  it.each([null, false, 'string', Math.PI, Symbol(), undefined])('Returns false for invalid inputs', (item) => {
    expect(isAnyObject(item)).toBeFalsy();
  });
});

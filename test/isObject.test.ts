import { describe, it, expect } from 'vitest';

import { isObject } from '../src/isObject';

describe('isObject()', () => {
  it('Returns true if input is an object', () => {
    expect(isObject({})).toBeTruthy();
  });

  it('Returns false if input is not an object', () => {
    [null, false, Symbol(), undefined, 'hi', 1, 1n].forEach(value => {
      expect(isObject(value)).toBeFalsy();
    });
  });
});

import { describe, it, expect } from 'vitest';

import { isBinaryNumberString } from '../../src/predicate/isBinaryNumberString.js';

describe('isBinaryNumberString()', () => {
  it('Returns true for valid input', () => {
    expect(isBinaryNumberString('0b10')).toBeTruthy();
    expect(isBinaryNumberString('0B10')).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isBinaryNumberString('0b012')).toBeFalsy();
    expect(isBinaryNumberString(null)).toBeFalsy();
    expect(isBinaryNumberString(undefined)).toBeFalsy();
    expect(isBinaryNumberString(Number.MAX_SAFE_INTEGER)).toBeFalsy();
  });
});

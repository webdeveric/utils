import { describe, it, expect } from 'vitest';

import { isOctalNumberString } from '../../src/predicate/isOctalNumberString.js';

describe('isOctalNumberString()', () => {
  it('Returns true for valid input', () => {
    expect(isOctalNumberString('0o01234567')).toBeTruthy();
    expect(isOctalNumberString('0O01234567')).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isOctalNumberString(null)).toBeFalsy();
    expect(isOctalNumberString(undefined)).toBeFalsy();
    expect(isOctalNumberString(Number.MAX_SAFE_INTEGER)).toBeFalsy();
  });
});

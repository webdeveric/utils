import { describe, it, expect } from 'vitest';

import { isHexNumberString } from '../../src/predicate/isHexNumberString.js';

describe('isHexNumberString()', () => {
  it('Returns true for valid input', () => {
    expect(isHexNumberString('0x0123456789abcdef')).toBeTruthy();
    expect(isHexNumberString('0X0123456789ABCDEF')).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isHexNumberString(null)).toBeFalsy();
    expect(isHexNumberString(undefined)).toBeFalsy();
    expect(isHexNumberString(Number.MAX_SAFE_INTEGER)).toBeFalsy();
  });
});

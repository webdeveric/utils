import { describe, expect, it } from 'vitest';

import { codePointLength } from '../src/codePointLength.js';

describe('codePointLength()', () => {
  it('Empty input returns 0', () => {
    expect(codePointLength('')).toBe(0);
  });

  it('Counts ASCII characters', () => {
    expect(codePointLength('hello')).toBe(5);
  });

  it('Counts a single character made of a surrogate pair as 1', () => {
    expect(codePointLength('😀')).toBe(1);
    expect('😀'.length).toBe(2);
  });

  it('Counts a mix of ASCII and surrogate pair characters', () => {
    expect(codePointLength('a😀b😀c')).toBe(5);
    expect('a😀b😀c'.length).toBe(7);
  });
});

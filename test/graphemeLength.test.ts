import { describe, expect, it } from 'vitest';

import { graphemeLength } from '../src/graphemeLength.js';

describe('graphemeLength()', () => {
  it('Empty input returns 0', () => {
    expect(graphemeLength('')).toBe(0);
  });

  it('Counts ASCII characters', () => {
    expect(graphemeLength('hello')).toBe(5);
  });

  it('Counts a single character made of a surrogate pair as 1', () => {
    expect(graphemeLength('😀')).toBe(1);
    expect('😀'.length).toBe(2);
  });

  it('Counts a ZWJ emoji sequence as a single grapheme', () => {
    expect(graphemeLength('👨‍👩‍👧‍👦')).toBe(1);
    expect('👨‍👩‍👧‍👦'.length).toBe(11);
  });

  it('Counts a combining character sequence as a single grapheme', () => {
    expect(graphemeLength('é')).toBe(1);
    expect('é'.length).toBe(2);
  });

  it('Counts a mix of ASCII and multi-code-unit graphemes', () => {
    expect(graphemeLength('a😀b👨‍👩‍👧‍👦c')).toBe(5);
  });
});

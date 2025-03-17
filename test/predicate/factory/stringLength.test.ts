import { describe, it, expect } from 'vitest';

import { stringLength } from '../../../src/predicate/factory/stringLength.js';

import type { AlphanumericCharacter } from '../../../src/index.js';

describe('stringLength()', () => {
  it('Returns a type predicate function', () => {
    const fn = stringLength(1, 10);

    expect(fn).toBeInstanceOf(Function);
    expect(fn('a')).toBeTruthy();
    expect(fn('')).toBeFalsy();
    expect(fn(undefined)).toBeFalsy();
    expect(fn('a'.repeat(20))).toBeFalsy();
  });

  it('Max is optional', () => {
    const fn = stringLength<AlphanumericCharacter>(1);

    expect(fn('a'.repeat(20))).toBeTruthy();
  });

  it('Min must be >= 0', () => {
    expect(() => stringLength(-1)).toThrow(RangeError);
  });

  it('Min must be less than max', () => {
    expect(() => stringLength(100, 0)).toThrow(RangeError);
  });
});

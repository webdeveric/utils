import { describe, it, expect } from 'vitest';

import { is } from '../../src/predicate-factory/is.js';

describe('is()', () => {
  it('Returns a type predicate function', () => {
    const fn = is('test', 123);

    expect(fn('test')).toBeTruthy();

    expect(fn(123)).toBeTruthy();

    expect(fn('bad input')).toBeFalsy();
  });

  it('Empty args gets a predicate function that always returns false', () => {
    expect(is()('test')).toBeFalsy();
  });

  it('Uses Object.is()', () => {
    const now = new Date();

    const fn = is('test', now);

    expect(fn('abc123')).toBeFalsy();

    expect(fn(new Date())).toBeFalsy();

    expect(fn(now)).toBeTruthy();
  });
});

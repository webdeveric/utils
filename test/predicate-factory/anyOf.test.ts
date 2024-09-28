import { describe, it, expect } from 'vitest';

import { anyOf } from '../../src/predicate-factory/anyOf.js';

describe('anyOf()', () => {
  it('Requires one or more type predicate function', () => {
    expect(() => anyOf()).toThrow();
  });

  it('Returns a type predicate function', () => {
    const fn = anyOf(
      (input) => typeof input === 'string',
      (input) => typeof input === 'boolean',
    );

    expect(fn).instanceOf(Function);

    expect(fn('test')).toBeTruthy();
    expect(fn(false)).toBeTruthy();
    expect(fn(0)).toBeFalsy();
  });
});

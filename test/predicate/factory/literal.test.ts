import { describe, it, expect } from 'vitest';

import { literal } from '../../../src/predicate/factory/literal.js';

describe('literal()', () => {
  it('Returns a type predicate function', () => {
    const fn = literal('test');

    expect(fn).instanceOf(Function);
    expect(fn('test')).toBeTruthy();
    expect(fn(false)).toBeFalsy();
    expect(fn(0)).toBeFalsy();
  });
});

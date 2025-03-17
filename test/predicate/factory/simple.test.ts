import { describe, it, expect, vi } from 'vitest';

import { literal } from '../../../src/predicate/factory/literal.js';
import { simple } from '../../../src/predicate/factory/simple.js';

import type { TypePredicateFn } from '../../../src/types/functions.js';

describe('simple()', () => {
  it('Returns a type predicate function', () => {
    expect(simple(literal(true))).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(literal(true)) as unknown as TypePredicateFn<true>;

    const fn = simple(predicate);

    expect(fn(true)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(1);

    expect(fn(null)).toBeFalsy();
    expect(predicate).toHaveBeenCalledTimes(2);
  });
});

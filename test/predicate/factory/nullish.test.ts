import { describe, it, expect, vi } from 'vitest';

import { nullish } from '../../../src/predicate/factory/nullish.js';
import { isBoolean } from '../../../src/predicate/isBoolean.js';

describe('nullish()', () => {
  it('Returns a type predicate function', () => {
    expect(nullish(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = nullish(predicate);

    expect(fn(true)).toBeTruthy();
    expect(fn(false)).toBeTruthy();
    expect(fn(null)).toBeTruthy();
    expect(fn(undefined)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(2);
  });
});

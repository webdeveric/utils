import { describe, it, expect, vi } from 'vitest';

import { optional } from '../../../src/predicate/factory/optional.js';
import { isBoolean } from '../../../src/predicate/isBoolean.js';

describe('optional()', () => {
  it('Returns a type predicate function', () => {
    expect(optional(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = optional(predicate);

    expect(fn(true)).toBeTruthy();
    expect(fn(undefined)).toBeTruthy();
    expect(fn(false)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(2);
  });
});

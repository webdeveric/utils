import { describe, it, expect, vi } from 'vitest';

import { nullable } from '../../../src/predicate/factory/nullable.js';
import { isBoolean } from '../../../src/predicate/isBoolean.js';

describe('nullable()', () => {
  it('Returns a type predicate function', () => {
    expect(nullable(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = nullable(predicate);

    expect(fn(true)).toBeTruthy();
    expect(fn(null)).toBeTruthy();
    expect(fn(false)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(2);
  });
});

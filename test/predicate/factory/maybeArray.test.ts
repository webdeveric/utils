import { describe, it, expect, vi } from 'vitest';

import { maybeArray } from '../../../src/predicate/factory/maybeArray.js';
import { isBoolean } from '../../../src/predicate/isBoolean.js';

describe('maybeArray()', () => {
  it('Returns a type predicate function', () => {
    expect(maybeArray(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = maybeArray(predicate);

    expect(fn([true])).toBeTruthy();
    expect(fn([false])).toBeTruthy();
    expect(fn(true)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(3);
  });
});

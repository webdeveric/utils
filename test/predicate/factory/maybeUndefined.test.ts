import { describe, it, expect, vi } from 'vitest';

import { maybeUndefined } from '../../../src/predicate/factory/maybeUndefined.js';
import { isBoolean } from '../../../src/predicate/isBoolean.js';

describe('maybeUndefined()', () => {
  it('Returns a type predicate function', () => {
    expect(maybeUndefined(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = maybeUndefined(predicate);

    expect(fn(true)).toBeTruthy();
    expect(fn(undefined)).toBeTruthy();
    expect(fn(false)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(2);
  });
});

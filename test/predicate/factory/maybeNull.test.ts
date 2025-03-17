import { describe, it, expect, vi } from 'vitest';

import { maybeNull } from '../../../src/predicate/factory/maybeNull.js';
import { isBoolean } from '../../../src/predicate/isBoolean.js';

describe('maybeNull()', () => {
  it('Returns a type predicate function', () => {
    expect(maybeNull(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = maybeNull(predicate);

    expect(fn(true)).toBeTruthy();
    expect(fn(null)).toBeTruthy();
    expect(fn(false)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(2);
  });
});

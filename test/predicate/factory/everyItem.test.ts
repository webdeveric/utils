import { describe, it, expect, vi } from 'vitest';

import { everyItem } from '../../../src/predicate/factory/everyItem.js';
import { isBoolean } from '../../../src/predicate/isBoolean.js';

describe('everyItem()', () => {
  it('Returns a type predicate function', () => {
    expect(everyItem(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = everyItem(predicate);

    expect(fn([true])).toBeTruthy();
    expect(fn([false])).toBeTruthy();
    expect(fn(['test'])).toBeFalsy();
    expect(fn(true)).toBeFalsy();
    expect(predicate).toHaveBeenCalledTimes(3);
  });
});

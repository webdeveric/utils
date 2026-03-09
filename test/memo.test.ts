import { describe, expect, it, vi } from 'vitest';

import { memo } from '../src/memo.js';

describe('memo()', () => {
  it('Memoizes functions', () => {
    const mock = vi.fn((str: string) => str);

    const fn = memo(mock);

    expect(mock).not.toHaveBeenCalled();

    fn('test');

    expect(mock).toHaveBeenCalledTimes(1);

    fn('test');

    expect(mock).toHaveBeenCalledTimes(1);

    fn('test2');

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it('Memoizes async functions', async () => {
    const mock = vi.fn(async (str: string): Promise<string> => str);

    const fn = memo(mock);

    expect(mock).not.toHaveBeenCalled();

    await fn('test');

    expect(mock).toHaveBeenCalledTimes(1);

    await fn('test');

    expect(mock).toHaveBeenCalledTimes(1);

    await fn('test2');

    expect(mock).toHaveBeenCalledTimes(2);

    expect(fn('test3')).toBe(fn('test3'));
  });

  it('Cache is available on the memoized function', () => {
    const mock = vi.fn((str: string) => str);

    const fn = memo(mock);

    expect(mock).not.toHaveBeenCalled();

    fn('test');

    expect(mock).toHaveBeenCalledTimes(1);

    fn('test');

    expect(mock).toHaveBeenCalledTimes(1);

    fn.cache.clear();

    fn('test');

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it('Cache key is configurable', () => {
    const mock = vi.fn((_id: number, name: string) => name);

    const fn = memo(mock, ([id, name]) => `${id}-${name}-key`);

    fn(1, 'test');

    expect(fn.cache.has('1-test-key')).toBe(true);
  });

  it('Default getCacheKey()', () => {
    const mock = vi.fn((_id: number | null | undefined, name: string) => name);

    const fn = memo(mock);

    expect(mock).not.toHaveBeenCalled();

    fn(1, 'test');

    expect(mock).toHaveBeenCalledTimes(1);

    expect(fn.cache.has(1)).toBe(true);

    fn(null, 'test');

    expect(mock).toHaveBeenCalledTimes(2);

    fn(undefined, 'test');

    // `undefined` serialized to `null` when used in arrays.
    expect(mock).toHaveBeenCalledTimes(2);

    expect(fn.cache.has('[null,"test"]')).toBe(true);
  });
});

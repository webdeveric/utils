import type { AnyFunction } from './types/common.js';

export type CacheKeyFn<Fn extends AnyFunction, ReturnValue = unknown> = (args: Parameters<Fn>) => ReturnValue;

export type DefaultCacheKeyFn<Fn extends AnyFunction> = CacheKeyFn<Fn, NonNullable<Parameters<Fn>[0]> | string>;

export type MemoizedFn<Fn extends AnyFunction, CkFn extends CacheKeyFn<Fn>> = Fn & {
  cache: Map<ReturnType<CkFn>, ReturnType<Fn>>;
};

/**
 * Memoize a function
 *
 * @todo use `Map.getOrInsertComputed()` once it is widely available.
 */
export function memo<Fn extends AnyFunction, CkFn extends CacheKeyFn<Fn>>(
  fn: Fn,
  getCacheKey: CkFn,
): MemoizedFn<Fn, CkFn>;

export function memo<Fn extends AnyFunction>(fn: Fn): MemoizedFn<Fn, DefaultCacheKeyFn<Fn>>;

export function memo<Fn extends AnyFunction, CkFn extends CacheKeyFn<Fn>>(
  fn: Fn,
  getCacheKey?: CkFn,
): MemoizedFn<Fn, CkFn> {
  const defaultGetCacheKey: DefaultCacheKeyFn<Fn> = (args) => args[0] ?? JSON.stringify(args);

  const resolvedGetCacheKey = getCacheKey ?? defaultGetCacheKey;

  const memoized = (...args: Parameters<Fn>): ReturnType<Fn> => {
    const key = resolvedGetCacheKey(args);

    if (memoized.cache.has(key)) {
      return memoized.cache.get(key);
    }

    const value = fn(...args);

    memoized.cache.set(key, value);

    return value;
  };

  memoized.cache = new Map();

  return memoized as MemoizedFn<Fn, CkFn>;
}

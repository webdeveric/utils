import type { AnyFunction } from './types/common.js';

export function tryIt<Fn extends AnyFunction>(fn: Fn): ReturnType<Fn> | undefined;

export function tryIt<Fn extends AnyFunction, D>(fn: Fn, defaultValue: D): ReturnType<Fn> | D;

/**
 * Call `fn` and return `defaultValue` instead of throwing if it fails.
 *
 * @example
 * ```ts
 * tryIt(() => JSON.parse('invalid'), {}); // {}
 * tryIt(() => JSON.parse('{"a":1}')); // { a: 1 }
 * ```
 */
export function tryIt<Fn extends AnyFunction, D>(fn: Fn, defaultValue?: D): ReturnType<Fn> | D | undefined {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}

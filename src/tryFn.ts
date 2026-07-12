import type { AnyFunction } from './types/common.js';

export function tryFn<Fn extends AnyFunction>(fn: Fn): (...args: Parameters<Fn>) => ReturnType<Fn> | undefined;

export function tryFn<Fn extends AnyFunction, DefaultValue>(
  fn: Fn,
  defaultValue: DefaultValue,
): (...args: Parameters<Fn>) => ReturnType<Fn> | DefaultValue;

/**
 * Wrap `fn` so calling it returns `defaultValue` instead of throwing.
 *
 * @example
 * ```ts
 * const parse = tryFn(JSON.parse, {});
 *
 * parse('invalid'); // {}
 * parse('{"a":1}'); // { a: 1 }
 * ```
 */
export function tryFn<Fn extends AnyFunction, DefaultType>(
  fn: Fn,
  defaultValue?: DefaultType,
): (...args: Parameters<Fn>) => ReturnType<Fn> | DefaultType | undefined {
  return (...args: Parameters<Fn>) => {
    try {
      return fn(...args);
    } catch {
      return defaultValue;
    }
  };
}

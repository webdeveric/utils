import { get } from '../get.js';
import { has } from '../has.js';

import type { TypePredicateFn } from '../types/functions.js';
import type { WithPath } from '../types/objects.js';

export function assertPathExists<Input extends object, InputPath extends string | number>(
  input: Input,
  path: InputPath,
): asserts input is Input & WithPath<Input, InputPath>;

export function assertPathExists<Input extends object, InputPath extends string | number, Value>(
  input: Input,
  path: InputPath,
  predicate: TypePredicateFn<Value>,
): asserts input is Input & WithPath<Input, InputPath, Value>;

/**
 * Assert that `path` exists on `input`, optionally checking the value at that path with `predicate`.
 *
 * @example
 * ```ts
 * const input = { a: { b: 1 } };
 *
 * assertPathExists(input, 'a.b'); // does not throw
 * assertPathExists(input, 'a.b', (value): value is number => typeof value === 'number'); // does not throw
 * assertPathExists(input, 'c'); // throws Error: object path (c) does not exist on input
 * ```
 */
export function assertPathExists<Input extends object, InputPath extends string | number>(
  input: Input,
  path: InputPath,
  predicate?: TypePredicateFn<unknown>,
): asserts input is Input & WithPath<Input, InputPath> {
  if (!has(input, path)) {
    throw new Error(`object path (${path}) does not exist on input`);
  }

  if (predicate && !predicate(get(input, path))) {
    throw new Error(`object path (${path}) failed predicate check`);
  }
}

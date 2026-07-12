import { getError } from './getError.js';

import type { TypePredicateFn } from '../types/functions.js';

export type ErrorFactory = (input: unknown) => Error;

/**
 * Assert that `input` satisfies the given `predicate`.
 *
 * @example
 * ```ts
 * const isNumber = (value: unknown): value is number => typeof value === 'number';
 *
 * assertPredicate(42, isNumber); // does not throw
 * assertPredicate('42', isNumber); // throws TypeError: invalid input
 * ```
 */
export function assertPredicate<T>(
  input: unknown,
  predicate: TypePredicateFn<T>,
  error: string | Error | ErrorFactory = 'invalid input',
): asserts input is T {
  if (!predicate(input)) {
    throw typeof error === 'function' ? error(input) : getError(error);
  }
}

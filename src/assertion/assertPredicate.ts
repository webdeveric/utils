import { getError } from './getError.js';

import type { TypePredicateFn } from '../types/functions.js';

export type ErrorFactory = (input: unknown) => Error;

export function assertPredicate<T>(
  input: unknown,
  predicate: TypePredicateFn<T>,
  error: string | Error | ErrorFactory = 'invalid input',
): asserts input is T {
  if (!predicate(input)) {
    throw typeof error === 'function' ? error(input) : getError(error);
  }
}

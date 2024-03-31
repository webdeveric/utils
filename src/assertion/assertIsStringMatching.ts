import { createStringMatchingPredicate } from '../predicate-factory/createStringMatchingPredicate.js';

import { getError } from './getError.js';

export function assertIsStringMatching(
  input: unknown,
  pattern: RegExp,
  error: string | Error = 'input is not a string that matches the pattern',
): asserts input is string {
  if (!createStringMatchingPredicate(pattern)(input)) {
    throw getError(error);
  }
}

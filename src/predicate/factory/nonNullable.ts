import type { TypePredicateFn } from '../../types/functions.js';

/**
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype
 */
export const nonNullable =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<NonNullable<T>> =>
  (input: unknown): input is NonNullable<T> =>
    input != null && predicate(input);

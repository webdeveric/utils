import type { AnyNewable } from '../../types/common.js';
import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that checks if `input` is an instance of the given `constructor`.
 *
 * @example
 * ```ts
 * const isDate = instanceOf(Date);
 * isDate(new Date()); // true
 * isDate('2024-01-01'); // false
 * ```
 */
export const instanceOf =
  <T extends AnyNewable>(constructor: T): TypePredicateFn<InstanceType<T>> =>
  (input: unknown): input is InstanceType<T> =>
    input instanceof constructor;

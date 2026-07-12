import type { TypePredicateFn } from '../../types/functions.js';

export function range(min: number, max: number): TypePredicateFn<number>;

export function range(min: bigint, max: bigint): TypePredicateFn<bigint>;

/**
 * Create a type predicate function that checks if `input` is a number or `bigint` within the inclusive range from `min` to `max`.
 *
 * @example
 * ```ts
 * const isPositive = range(0, Infinity);
 * isPositive(5); // true
 * isPositive(-1); // false
 * ```
 */
export function range(min: number | bigint, max: number | bigint): TypePredicateFn<number | bigint> {
  if (min === Number.NEGATIVE_INFINITY && max === Number.POSITIVE_INFINITY) {
    throw new RangeError('min and max cannot be -Infinity and Infinity');
  }

  if (Number.isNaN(min) || Number.isNaN(max)) {
    throw new RangeError('min and max must not be NaN');
  }

  if (min >= max) {
    throw new RangeError('min must be less than max');
  }

  return (input: unknown): input is number | bigint =>
    (typeof input === 'number' || typeof input === 'bigint') && input >= min && input <= max;
}

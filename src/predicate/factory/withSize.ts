import type { InferPredicateReturnType, TypePredicateFn } from '../../types/functions.js';
import type { NumberRange } from '../../types/numbers.js';

export function withSize<Fn extends TypePredicateFn<{ size: number }>, Size extends number>(
  fn: Fn,
  size: Size,
): TypePredicateFn<InferPredicateReturnType<Fn> & { size: Size }>;

export function withSize<Fn extends TypePredicateFn<{ size: number }>, const Size extends [number]>(
  fn: Fn,
  size: Size,
): TypePredicateFn<InferPredicateReturnType<Fn> & { size: Size[0] }>;

export function withSize<Fn extends TypePredicateFn<{ size: number }>, Range extends NumberRange>(
  fn: Fn,
  range: Range,
): TypePredicateFn<InferPredicateReturnType<Fn> & { size: number }>;

/**
 * Create a type predicate function that checks if `input` passes `fn` and has a `size` matching the given `size` or falling within the given range.
 *
 * @example
 * ```ts
 * const twoItemSet = withSize(instanceOf(Set), 2);
 * twoItemSet(new Set([1, 2])); // true
 * twoItemSet(new Set([1])); // false
 *
 * const setWithRange = withSize(instanceOf(Set), [1, 3]);
 * setWithRange(new Set([1, 2])); // true
 * setWithRange(new Set()); // false
 * ```
 */
export function withSize<Fn extends TypePredicateFn<{ size: number }>, SizeOrRange extends number | NumberRange>(
  fn: Fn,
  sizeRange: SizeOrRange,
): TypePredicateFn<InferPredicateReturnType<Fn> & { size: number }> {
  if (Array.isArray(sizeRange)) {
    const [min = 0, max = Number.POSITIVE_INFINITY] = sizeRange;

    if (min < 0) {
      throw new RangeError('min must be greater than or equal to 0');
    }

    if (min > max) {
      throw new RangeError('min cannot be greater than max');
    }

    return (input: unknown): input is InferPredicateReturnType<Fn> & { size: number } =>
      fn(input) && input.size >= min && input.size <= max;
  }

  return (input: unknown): input is InferPredicateReturnType<Fn> & { size: number } =>
    fn(input) && input.size === sizeRange;
}

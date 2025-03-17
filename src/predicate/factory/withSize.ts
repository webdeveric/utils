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

export function withSize<Fn extends TypePredicateFn<{ size: number }>, SizeOrRange extends number | NumberRange>(
  fn: Fn,
  sizeRange: SizeOrRange,
): TypePredicateFn<InferPredicateReturnType<Fn> & { size: number }> {
  if (Array.isArray(sizeRange)) {
    const [min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY] = sizeRange;

    if (min > max) {
      throw new RangeError('min cannot be greater than max');
    }

    return (input: unknown): input is InferPredicateReturnType<Fn> & { size: number } =>
      fn(input) && input.size >= min && input.size <= max;
  }

  return (input: unknown): input is InferPredicateReturnType<Fn> & { size: number } =>
    fn(input) && input.size === sizeRange;
}

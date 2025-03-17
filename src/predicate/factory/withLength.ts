import type { InferPredicateReturnType, TypePredicateFn } from '../../types/functions.js';
import type { NumberRange } from '../../types/numbers.js';

export function withLength<Fn extends TypePredicateFn<{ length: number }>, Length extends number>(
  fn: Fn,
  length: Length,
): TypePredicateFn<InferPredicateReturnType<Fn> & { length: Length }>;

export function withLength<Fn extends TypePredicateFn<{ length: number }>, const Length extends [number]>(
  fn: Fn,
  length: Length,
): TypePredicateFn<InferPredicateReturnType<Fn> & { length: Length[0] }>;

export function withLength<Fn extends TypePredicateFn<{ length: number }>, Range extends NumberRange>(
  fn: Fn,
  range: Range,
): TypePredicateFn<InferPredicateReturnType<Fn> & { length: number }>;

export function withLength<Fn extends TypePredicateFn<{ length: number }>, LengthOrRange extends number | NumberRange>(
  fn: Fn,
  lengthRange: LengthOrRange,
): TypePredicateFn<InferPredicateReturnType<Fn> & { length: number }> {
  if (Array.isArray(lengthRange)) {
    const [min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY] = lengthRange;

    if (min > max) {
      throw new RangeError('min cannot be greater than max');
    }

    return (input: unknown): input is InferPredicateReturnType<Fn> & { length: number } =>
      fn(input) && input.length >= min && input.length <= max;
  }

  return (input: unknown): input is InferPredicateReturnType<Fn> & { length: number } =>
    fn(input) && input.length === lengthRange;
}

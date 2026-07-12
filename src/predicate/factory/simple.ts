import type { InferPredicateReturnType, TypePredicateFn } from '../../types/functions.js';

export type Simple<Type> = Type extends string
  ? string
  : Type extends number
    ? number
    : Type extends boolean
      ? boolean
      : Type extends bigint
        ? bigint
        : Type extends symbol
          ? symbol
          : Type extends undefined
            ? undefined
            : Type extends null
              ? null
              : Type extends Function
                ? Function
                : Type extends unknown[]
                  ? unknown[]
                  : Type extends object
                    ? object
                    : never;

/**
 * Create a type predicate function that narrows the result of `fn` down to its simple (non-branded) type.
 *
 * @example
 * ```ts
 * const isSimpleNumber = simple(isInt32); // narrows from branded `Int32` down to plain `number`
 * isSimpleNumber(5); // true
 * isSimpleNumber('5'); // false
 * ```
 */
export const simple =
  <Fn extends TypePredicateFn<unknown>>(fn: Fn): TypePredicateFn<Simple<InferPredicateReturnType<Fn>>> =>
  (input): input is Simple<InferPredicateReturnType<Fn>> =>
    fn(input);

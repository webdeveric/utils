/* eslint-disable @typescript-eslint/ban-types */
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

export const simple =
  <Fn extends TypePredicateFn<unknown>>(fn: Fn): TypePredicateFn<Simple<InferPredicateReturnType<Fn>>> =>
  (input): input is Simple<InferPredicateReturnType<Fn>> =>
    fn(input);

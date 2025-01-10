import type { Primitive } from '../types/common.js';
import type { TypePredicateFn } from '../types/functions.js';

export type TuplePredicateInput = (Primitive | TypePredicateFn<unknown>)[];

export type GetTupleFromInput<Type extends TuplePredicateInput> = {
  [Property in keyof Type]: Type[Property] extends TypePredicateFn<infer T> ? T : Type[Property];
};

export const createIsTuplePredicate = <const Input extends TuplePredicateInput>(
  tupleShape: Input,
): TypePredicateFn<GetTupleFromInput<Input>> => {
  return (input: unknown): input is GetTupleFromInput<Input> =>
    Array.isArray(input) && input.length === tupleShape.length
      ? input.every((value, index) => {
          const item = tupleShape[index];

          return typeof item === 'function' ? item(value) : Object.is(value, item);
        })
      : false;
};

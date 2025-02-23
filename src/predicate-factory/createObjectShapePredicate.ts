import { isAnyObject } from '../predicate/isAnyObject.js';

import { createStringMatchingPredicate } from './createStringMatchingPredicate.js';

import type { Primitive } from '../types/common.js';
import type { InferPredicateReturnType, TypePredicateFn } from '../types/functions.js';
import type { Pretty } from '../types/utils.js';

export type WithRegExp<Type> = Type extends string ? Type | RegExp : Type;

export type ObjectShapeValue<Type> = Type extends object
  ? ObjectShapeRecord<Type>
  : WithRegExp<Extract<Type, Primitive>>;

export type ObjectShapeRecord<Type extends object = object> = {
  [Property in keyof Type]: ObjectShapeValue<Type[Property]> | TypePredicateFn<Type[Property]>;
};

export type InferTypeFromShapeValue<Type> = Type extends RegExp
  ? string
  : Type extends Primitive
    ? Type
    : Type extends TypePredicateFn<unknown>
      ? InferPredicateReturnType<Type>
      : Type extends ObjectShapeRecord<object>
        ? InferTypeFromShape<Type>
        : never;

export type InferTypeFromShape<Shape extends ObjectShapeRecord<object>> = Pretty<{
  -readonly [Property in keyof Shape]: InferTypeFromShapeValue<Shape[Property]>;
}>;

export const createObjectShapePredicate = <
  Type extends object,
  const Shape extends ObjectShapeRecord<Type> = ObjectShapeRecord<Type>,
>(
  shape: Shape,
): TypePredicateFn<InferTypeFromShape<Shape>> => {
  const entries: [key: string, predicate: TypePredicateFn<unknown>][] = Object.entries(shape).map(([key, value]) => {
    const predicate =
      typeof value === 'function'
        ? (value as TypePredicateFn<unknown>)
        : value instanceof RegExp
          ? createStringMatchingPredicate(value)
          : isAnyObject(value)
            ? createObjectShapePredicate(value)
            : (input: unknown): input is typeof value => input === value;

    return [key, predicate];
  });

  return (input: unknown): input is InferTypeFromShape<Shape> =>
    isAnyObject(input) && entries.every(([key, predicate]) => predicate(input[key]));
};

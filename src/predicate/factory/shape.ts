/* eslint-disable @typescript-eslint/ban-types */
import { isAnyObject } from '../isAnyObject.js';

import { literal } from './literal.js';
import { matching } from './matching.js';

import type { Branded } from '../../types/branded.js';
import type { Primitive } from '../../types/common.js';
import type { InferPredicateReturnType, TypePredicateFn } from '../../types/functions.js';
import type { Pretty } from '../../types/utils.js';

export type WithRegExp<Type> = Type extends string ? Type | RegExp : Type;

export type ObjectShapeValue<Type> =
  Type extends Branded<unknown, unknown>
    ? TypePredicateFn<Type>
    : Type extends object
      ? Type extends Function
        ? TypePredicateFn<Function>
        : ObjectShapeRecord<Type>
      : WithRegExp<Extract<Type, Primitive>>;

export type ObjectShapeRecord<Type extends object> = {
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

export type InferTypeFromShape<Shape extends ObjectShapeRecord<object>> = {
  [Property in keyof Shape]: InferTypeFromShapeValue<Shape[Property]>;
};

export const shape = <Type extends object, const Shape extends ObjectShapeRecord<Type> = ObjectShapeRecord<Type>>(
  objectShape: Shape,
): TypePredicateFn<Pretty<Type & InferTypeFromShape<Shape>>> => {
  const entries: [key: string | symbol, predicate: TypePredicateFn<unknown>][] = Reflect.ownKeys(objectShape).map(
    (key) => {
      const value = Reflect.get(objectShape, key);

      const predicate =
        typeof value === 'function'
          ? (value as TypePredicateFn<unknown>)
          : value instanceof RegExp
            ? matching(value)
            : isAnyObject(value)
              ? shape(value)
              : literal(value);

      return [key, predicate];
    },
  );

  return (input: unknown): input is Pretty<Type & InferTypeFromShape<Shape>> =>
    isAnyObject(input) && entries.every(([key, predicate]) => predicate(Reflect.get(input, key)));
};

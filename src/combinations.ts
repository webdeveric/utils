import { asArray } from './asArray.js';
import { cartesian } from './cartesian.js';
import { isObject } from './predicate/isObject.js';

import type { UnknownRecord } from './types/records.js';

export type CombinationsInput<Type> = {
  [Property in keyof Type]: Type[Property] extends UnknownRecord
    ? CombinationsInput<Type[Property]>
    : Type[Property] | Type[Property][];
};

export type CombinationsOutput<Input extends CombinationsInput<unknown>> =
  Input extends CombinationsInput<infer Type> ? Type : never;

export function* combinations<
  Type extends object = object,
  Input extends CombinationsInput<Type> = CombinationsInput<Type>,
>(input: Input): Generator<CombinationsOutput<Input>, undefined> {
  const propertyNames = Object.keys(input);
  const propertyValues = Object.values(input).map((value) =>
    isObject(value) ? [...combinations(value)] : asArray(value),
  );

  for (const combo of cartesian(...propertyValues)) {
    yield Object.fromEntries(combo.map((value, index) => [propertyNames[index], value]));
  }
}

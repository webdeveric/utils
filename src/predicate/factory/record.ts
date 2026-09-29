import { isObject } from '../isObject.js';

import type { TypePredicateFn } from '../../types/functions.js';

export const record = <Key extends string | symbol, Value>(
  keyPredicate: TypePredicateFn<Key>,
  valuePredicate: TypePredicateFn<Value>,
): TypePredicateFn<Record<Key, Value>> => {
  return (input: unknown): input is Record<Key, Value> =>
    isObject(input)
      ? Reflect.ownKeys(input).every((key) => keyPredicate(key) && valuePredicate(Reflect.get(input, key)))
      : false;
};

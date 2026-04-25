import { isAnyObject } from './predicate/isAnyObject.js';

import type { CompareFn } from './types/functions.js';
import type { KeyValueTuple } from './types/tuples.js';

const defaultCompareFunction: CompareFn<string | symbol> = (left, right) =>
  typeof left === 'symbol' || typeof right === 'symbol' ? 0 : left.localeCompare(right);

export function getSortedObject<Data extends object>(data: Data, compareFunction?: CompareFn<string | symbol>): Data;

export function getSortedObject<Data extends object>(
  data: Data[],
  compareFunction?: CompareFn<string | symbol>,
): Data[];

export function getSortedObject<Data extends object>(
  data: Data | Data[],
  compareFunction: CompareFn<string | symbol> = defaultCompareFunction,
): Data | Data[] {
  if (Array.isArray(data)) {
    return data.map((item) => getSortedObject(item, compareFunction));
  }

  const entries = Reflect.ownKeys(data)
    .sort(compareFunction)
    .map((key): KeyValueTuple<string | symbol, unknown> => {
      const value = data[key as keyof typeof data];

      return [key, isAnyObject(value) ? getSortedObject(value, compareFunction) : value];
    });

  return Object.fromEntries(entries) as Data;
}

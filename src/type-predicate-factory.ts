import type { TypePredicateFn } from './types/functions.js';
import type { UnknownRecord } from './types/records.js';

export const createIsEnumPredicate = <T extends UnknownRecord>(enumObject: T): TypePredicateFn<T[keyof T]> => {
  const values = new Set(Object.values(enumObject));

  return (input: unknown): input is T[keyof T] => values.has(input);
};

export const createStringMatchingPredicate =
  <T extends string>(pattern: RegExp): TypePredicateFn<T> =>
  (input: unknown): input is T =>
    typeof input === 'string' && pattern.test(input);

export const everyItem =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T[]> =>
  (input: unknown): input is T[] =>
    Array.isArray(input) && input.every(predicate);

export const maybeArray =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | T[]> =>
  (input: unknown): input is T | T[] =>
    Array.isArray(input) ? input.every(predicate) : predicate(input);

export const maybeNull =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | null> =>
  (input: unknown): input is T | null =>
    input === null || predicate(input);

export const maybeUndefined =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | undefined> =>
  (input: unknown): input is T | undefined =>
    typeof input === 'undefined' || predicate(input);

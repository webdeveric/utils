import type { TypePredicateFn } from '../types/functions.js';
import type { UnknownRecord } from '../types/records.js';

export const createIsEnumPredicate = <T extends UnknownRecord>(enumObject: T): TypePredicateFn<T[keyof T]> => {
  const values = new Set(Object.values(enumObject));

  return (input: unknown): input is T[keyof T] => values.has(input);
};

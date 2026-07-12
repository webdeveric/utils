import type { TypePredicateFn } from '../../types/functions.js';
import type { EnumRecord } from '../../types/records.js';

/**
 * @internal
 */
const getEnumValues = <T extends EnumRecord>(enumObject: T): Set<unknown> => {
  const entries = Object.entries(enumObject);

  const ignoreKeys = entries.reduce((keys, [, value]) => {
    if (typeof value === 'number') {
      keys.add(String(value));
    }

    return keys;
  }, new Set<string>());

  return entries.reduce((values, [key, value]) => {
    if (!ignoreKeys.has(key)) {
      values.add(value);
    }

    return values;
  }, new Set<unknown>());
};

/**
 * Create a type predicate function that checks if the input is a member of the TypeScript `enum`
 *
 * @example
 * ```ts
 * enum Color {
 *   Red,
 *   Green,
 *   Blue,
 * }
 *
 * const isColor = fromEnum(Color);
 * isColor(Color.Red); // true
 * isColor(0); // true
 * isColor(3); // false
 * ```
 */
export const fromEnum = <T extends EnumRecord>(enumObject: T): TypePredicateFn<T[keyof T]> => {
  const values = getEnumValues(enumObject);

  return (input: unknown): input is T[keyof T] => values.has(input);
};

import type { Path } from './types/objects.js';
import type { AnyRecord } from './types/records.js';

/**
 * Get all own property paths of `input`, including dot-separated paths for nested objects.
 *
 * @example
 * ```ts
 * getOwnPaths({ a: 1, b: { c: 2 } }); // ['a', 'b', 'b.c']
 * ```
 */
export const getOwnPaths = <Type extends AnyRecord>(input: Type): Path<Type>[] => {
  return Object.entries(input).reduce<string[]>((paths, [key, value]) => {
    paths.push(key);

    if (value && typeof value === 'object') {
      paths.push(...getOwnPaths(value).map((childKey) => `${key}.${childKey}`));
    }

    return paths;
  }, []) as Path<Type>[];
};

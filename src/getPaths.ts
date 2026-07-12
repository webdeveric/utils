import type { Path } from './types/objects.js';
import type { AnyRecord } from './types/records.js';

/**
 * Get every property path in `input`, including nested paths.
 *
 * @example
 * ```ts
 * getPaths({ a: 1, b: { c: 2 } }); // ['a', 'b', 'b.c']
 * ```
 */
export const getPaths = <Type extends AnyRecord>(input: Type): Path<Type>[] => {
  const paths: string[] = [];

  for (const key in input) {
    paths.push(key);

    const value = input[key];

    if (value && typeof value === 'object') {
      paths.push(...getPaths(value).map((childKey) => `${key}.${childKey}`));
    }
  }

  return paths as Path<Type>[];
};

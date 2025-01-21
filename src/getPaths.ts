import type { Path } from './types/objects.js';
import type { AnyRecord } from './types/records.js';

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

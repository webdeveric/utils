import type { Path } from './types/objects.js';
import type { AnyRecord } from './types/records.js';

export const getOwnPaths = <Type extends AnyRecord>(input: Type): Path<Type>[] => {
  return Object.entries(input).reduce<string[]>((paths, [key, value]) => {
    paths.push(key);

    if (value && typeof value === 'object') {
      paths.push(...getOwnPaths(value).map((childKey) => `${key}.${childKey}`));
    }

    return paths;
  }, []) as Path<Type>[];
};

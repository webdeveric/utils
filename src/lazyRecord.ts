import { lazyProp } from './lazyProp.js';

import type { AnyFunction } from './types/common.js';
import type { UnknownRecord } from './types/records.js';

export type LazyRecordProperties<Type extends UnknownRecord> = {
  [Key in keyof Type]: Exclude<Type[Key], AnyFunction> | (() => Type[Key]);
};

/**
 * Create an object whose properties are computed lazily.
 *
 * @example
 * ```ts
 * const data = lazyRecord({
 *   name: 'Name',
 *   now() {
 *     return Date.now();
 *   },
 * });
 * ```
 */
export function lazyRecord<Type extends UnknownRecord>(properties: LazyRecordProperties<Type>): Type {
  const record = Object.create(null);

  for (const [key, getter] of Object.entries(properties)) {
    Object.defineProperty(
      record,
      key,
      typeof getter === 'function'
        ? lazyProp(key, getter)
        : {
            value: getter,
            writable: true,
            configurable: true,
          },
    );
  }

  return record;
}

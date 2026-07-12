import type { Primitive } from './types/common.js';

/**
 * Prepend `prefixString` to `value`, or return `defaultValue` if `value` is `null`, `undefined`, or an empty string.
 *
 * @example
 * ```ts
 * prefix('$', 5); // '$5'
 * prefix('$', null, 'N/A'); // 'N/A'
 * ```
 */
export const prefix = (prefixString: string, value: Exclude<Primitive, symbol>, defaultValue = ''): string => {
  if (value == null || (typeof value == 'string' && value.length === 0)) {
    return defaultValue;
  }

  return `${prefixString}${value}`;
};

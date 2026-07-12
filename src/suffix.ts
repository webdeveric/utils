import type { Primitive } from './types/common.js';

/**
 * Append `suffixString` to `value`, or return `defaultValue` if `value` is `null`, `undefined`, or an empty string.
 *
 * @example
 * ```ts
 * suffix('!', 'Hi'); // 'Hi!'
 * suffix('!', null, 'N/A'); // 'N/A'
 * ```
 */
export const suffix = (suffixString: string, value: Exclude<Primitive, symbol>, defaultValue = ''): string => {
  if (value == null || (typeof value == 'string' && value.length === 0)) {
    return defaultValue;
  }

  return `${value}${suffixString}`;
};

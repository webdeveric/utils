import type { StripWhitespace } from './types/strings.js';

/**
 * Remove all whitespace from `input`.
 *
 * @example
 * ```ts
 * stripWhitespace('a b\tc\nd'); // 'abcd'
 * ```
 */
export const stripWhitespace = <T extends string>(input: T): StripWhitespace<T> =>
  input.replace(/\s+/g, '') as StripWhitespace<T>;

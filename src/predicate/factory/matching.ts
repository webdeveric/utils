import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that checks if `input` is a string matching the given `pattern`.
 *
 * @example
 * ```ts
 * const isHexColor = matching(/^#[0-9a-f]{6}$/i);
 * isHexColor('#ff0000'); // true
 * isHexColor('red'); // false
 * ```
 */
export const matching =
  <T extends string>(pattern: RegExp): TypePredicateFn<T> =>
  (input: unknown): input is T =>
    typeof input === 'string' && pattern.test(input);

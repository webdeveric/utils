import type { TypeOf, TypeOfMapping } from '../../types/common.js';

/**
 * Create a type predicate function that checks if `input`'s `typeof` matches one of the given `types`.
 *
 * @example
 * ```ts
 * const isStringOrNumber = typeOf('string', 'number');
 * isStringOrNumber('hello'); // true
 * isStringOrNumber(5); // true
 * isStringOrNumber(true); // false
 * ```
 */
export const typeOf =
  <T extends TypeOf>(...types: T[]) =>
  <Input>(input: Input): input is Input & TypeOfMapping[T] =>
    types.some((type) => typeof input === type);

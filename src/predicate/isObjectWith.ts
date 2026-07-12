import { isObject } from './isObject.js';

/**
 * Determine if `input` is an object and has the provided properties.
 *
 * @example
 * ```ts
 * isObjectWith({ a: 1, b: 2 }, ['a', 'b']); // true
 * isObjectWith({ a: 1 }, ['a', 'b']); // false
 * ```
 */
export const isObjectWith = <T, P extends PropertyKey>(input: T, properties: P[]): input is T & Record<P, unknown> =>
  isObject(input) && properties.every((property) => property in input);

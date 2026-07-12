import { isAnyObject } from './isAnyObject.js';

/**
 * Determine if `input` is an object and has the provided properties.
 *
 * @example
 * ```ts
 * isAnyObjectWith({ a: 1, b: 2 }, ['a', 'b']); // true
 * isAnyObjectWith({ a: 1 }, ['a', 'b']); // false
 * ```
 */
export const isAnyObjectWith = <T, P extends PropertyKey>(
  input: T,
  properties: P[],
): input is T & Record<P, unknown> => {
  return isAnyObject(input) && properties.every((property) => property in input);
};

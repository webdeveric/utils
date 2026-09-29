import { isAnyObject } from './isAnyObject.js';

/**
 * Determine if `input` is an object and has the provided property or properties.
 *
 * @example
 * ```ts
 * isAnyObjectWith({ a: 1 }, 'a'); // true
 * isAnyObjectWith({ a: 1 }, 'b'); // false
 * isAnyObjectWith({ a: 1, b: 2 }, ['a', 'b']); // true
 * isAnyObjectWith({ a: 1 }, ['a', 'b']); // false
 * isAnyObjectWith({}, 'toString'); // true (inherited properties are included)
 * isAnyObjectWith(['a'], 0); // true (arrays are objects)
 * isAnyObjectWith(null, 'a'); // false
 * ```
 */
export const isAnyObjectWith = <T, P extends PropertyKey>(
  input: T,
  properties: P | P[],
): input is T & Record<P, unknown> => {
  return (
    isAnyObject(input) &&
    (Array.isArray(properties) ? properties.every((property) => property in input) : properties in input)
  );
};

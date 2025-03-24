import { isAnyObject } from './isAnyObject.js';

/**
 * Determine if `input` is an object and directly has the provided properties.
 */
export const isAnyObjectWithOwn = <T, P extends PropertyKey>(
  input: T,
  properties: P[],
): input is T & Record<P, unknown> => {
  return isAnyObject(input) && properties.every((property) => Object.hasOwn(input, property));
};

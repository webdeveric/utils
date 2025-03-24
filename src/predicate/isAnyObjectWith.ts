import { isAnyObject } from './isAnyObject.js';

/**
 * Determine if `input` is an object and has the provided properties.
 */
export const isAnyObjectWith = <T, P extends PropertyKey>(
  input: T,
  properties: P[],
): input is T & Record<P, unknown> => {
  return isAnyObject(input) && properties.every((property) => property in input);
};

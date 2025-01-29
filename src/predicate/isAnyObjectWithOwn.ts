import { asArray } from '../asArray.js';

import { isAnyObject } from './isAnyObject.js';

/**
 * Determine if `input` is an object and directly has the provided properties.
 */
export const isAnyObjectWithOwn = <T, P extends PropertyKey>(
  input: T,
  properties: P | P[],
): input is T & Record<P, unknown> => {
  return isAnyObject(input) && asArray(properties).every((property) => Object.hasOwn(input, property));
};

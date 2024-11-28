import { asArray } from '../asArray.js';

import { isAnyObject } from './isAnyObject.js';

/**
 * Determine if `input` is an object and has the provided properties.
 */
export const isAnyObjectWith = <T, P extends PropertyKey>(
  input: T,
  properties: P | P[],
): input is T & Record<P, unknown> => {
  return isAnyObject(input) && asArray(properties).every((property) => property in input);
};

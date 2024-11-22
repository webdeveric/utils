import { asArray } from '../asArray.js';

import { isObject } from './isObject.js';

/**
 * Determine if `input` is an object and has the provided properties.
 */
export const isObjectWith = <T, P extends PropertyKey>(
  input: T,
  properties: P | P[],
): input is T & Record<P, unknown> => {
  return isObject(input) && asArray(properties).every((property) => property in input);
};

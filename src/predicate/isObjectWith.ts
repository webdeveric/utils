import { isObject } from './isObject.js';

/**
 * Determine if `input` is an object and has the provided properties.
 */
export const isObjectWith = <T, P extends PropertyKey>(input: T, properties: P[]): input is T & Record<P, unknown> =>
  isObject(input) && properties.every((property) => property in input);

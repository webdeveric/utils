import { isObject } from './isObject.js';

export const isIterable = <T>(input: unknown): input is Iterable<T> => {
  return isObject(input) && typeof input[Symbol.iterator] === 'function';
};

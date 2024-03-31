import { isObject } from './isObject.js';

export const isAsyncIterable = <T>(input: unknown): input is AsyncIterable<T> => {
  return isObject(input) && typeof input[Symbol.asyncIterator] === 'function';
};

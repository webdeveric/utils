import { isObjectWith } from './isObjectWith.js';

export const isAsyncIterable = <T>(input: unknown): input is AsyncIterable<T> => {
  return isObjectWith(input, Symbol.asyncIterator) && typeof input[Symbol.asyncIterator] === 'function';
};

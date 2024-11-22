import { isObjectWith } from './isObjectWith.js';

export const isIterable = <T>(input: unknown): input is Iterable<T> => {
  return isObjectWith(input, Symbol.iterator) && typeof input[Symbol.iterator] === 'function';
};

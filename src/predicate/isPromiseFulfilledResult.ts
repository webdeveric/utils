import { isObject } from './isObject.js';

export const isPromiseFulfilledResult = <T>(input: unknown): input is PromiseFulfilledResult<T> => {
  return isObject(input) && input.status === 'fulfilled';
};

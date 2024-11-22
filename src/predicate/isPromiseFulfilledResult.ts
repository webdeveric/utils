import { isObjectWith } from './isObjectWith.js';

export const isPromiseFulfilledResult = <T>(input: unknown): input is PromiseFulfilledResult<T> => {
  return isObjectWith(input, 'status') && input.status === 'fulfilled';
};

import { isObject } from './isObject.js';

export const isPromiseRejectedResult = (input: unknown): input is PromiseRejectedResult => {
  return isObject(input) && input.status === 'rejected' && 'reason' in input;
};

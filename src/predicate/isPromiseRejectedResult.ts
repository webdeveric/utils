import { isObjectWith } from './isObjectWith.js';

export const isPromiseRejectedResult = (input: unknown): input is PromiseRejectedResult => {
  return isObjectWith(input, ['status', 'reason']) && input.status === 'rejected';
};

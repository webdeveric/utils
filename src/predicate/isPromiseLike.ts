import { isFunction } from './isFunction.js';
import { isObjectWith } from './isObjectWith.js';

export function isPromiseLike<T>(input: unknown): input is PromiseLike<T> {
  return isObjectWith(input, 'then') && isFunction(input.then) && input.then.length === 2;
}

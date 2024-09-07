import { isFunction } from './isFunction.js';
import { isObject } from './isObject.js';

export function isPromiseLike<T>(input: unknown): input is PromiseLike<T> {
  return isObject(input) && isFunction(input.then) && input.then.length === 2;
}

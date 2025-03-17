import { shape } from './factory/shape.js';
import { withLength } from './factory/withLength.js';
import { isFunction } from './isFunction.js';

export const isPromiseLike = shape<PromiseLike<unknown>>({
  then: withLength(isFunction, 2),
});

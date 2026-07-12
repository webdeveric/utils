import { shape } from './factory/shape.js';
import { withLength } from './factory/withLength.js';
import { isFunction } from './isFunction.js';

/**
 * Determine if `input` has a `then` function that accepts 2 arguments, matching the shape of a native `Promise`.
 *
 * @example
 * ```ts
 * isPromiseLike(Promise.resolve(42)); // true
 * isPromiseLike({ then: () => {} }); // false
 * ```
 */
export const isPromiseLike = shape<PromiseLike<unknown>>({
  then: withLength(isFunction, 2),
});

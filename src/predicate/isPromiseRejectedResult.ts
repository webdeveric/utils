import { shape } from './factory/shape.js';
import { isAny } from './isAny.js';

/**
 * Determine if `input` has the shape of a rejected `PromiseSettledResult`.
 *
 * @example
 * ```ts
 * isPromiseRejectedResult({ status: 'rejected', reason: 'error' }); // true
 * isPromiseRejectedResult({ status: 'fulfilled', value: 42 }); // false
 * ```
 */
export const isPromiseRejectedResult = shape<PromiseRejectedResult>({
  status: 'rejected',
  reason: isAny,
});

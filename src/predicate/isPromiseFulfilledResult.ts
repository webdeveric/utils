import { shape } from './factory/shape.js';
import { isUnknown } from './isUnknown.js';

/**
 * Determine if `input` has the shape of a fulfilled `PromiseSettledResult`.
 *
 * @example
 * ```ts
 * isPromiseFulfilledResult({ status: 'fulfilled', value: 42 }); // true
 * isPromiseFulfilledResult({ status: 'rejected', reason: 'error' }); // false
 * ```
 */
export const isPromiseFulfilledResult = shape<PromiseFulfilledResult<unknown>>({
  status: 'fulfilled',
  value: isUnknown,
});

import { shape } from './factory/shape.js';
import { isUnknown } from './isUnknown.js';

export const isPromiseFulfilledResult = shape<PromiseFulfilledResult<unknown>>({
  status: 'fulfilled',
  value: isUnknown,
});

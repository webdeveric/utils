import { shape } from './factory/shape.js';
import { isAny } from './isAny.js';

export const isPromiseRejectedResult = shape<PromiseRejectedResult>({
  status: 'rejected',
  reason: isAny,
});

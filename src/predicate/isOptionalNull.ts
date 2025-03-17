import { maybeUndefined } from './factory/maybeUndefined.js';
import { isNull } from './isNull.js';

export const isOptionalNull = maybeUndefined(isNull);

import { maybeUndefined } from '../predicate-factory/maybeUndefined.js';

import { isNumber } from './isNumber.js';

export const isOptionalNumber = maybeUndefined(isNumber);

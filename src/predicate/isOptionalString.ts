import { maybeUndefined } from '../predicate-factory/maybeUndefined.js';

import { isString } from './isString.js';

export const isOptionalString = maybeUndefined(isString);

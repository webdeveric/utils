import { maybeUndefined } from '../predicate-factory/maybeUndefined.js';

import { isBoolean } from './isBoolean.js';

export const isOptionalBoolean = maybeUndefined(isBoolean);

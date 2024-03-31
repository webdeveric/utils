import { maybeUndefined } from '../predicate-factory/maybeUndefined.js';

import { isNull } from './isNull.js';

export const isOptionalNull = maybeUndefined(isNull);

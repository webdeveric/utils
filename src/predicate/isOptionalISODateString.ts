import { maybeUndefined } from '../predicate-factory/maybeUndefined.js';

import { isISODateString } from './isISODateString.js';

export const isOptionalISODateString = maybeUndefined(isISODateString);

import { maybeUndefined } from '../predicate-factory/maybeUndefined.js';

import { isSymbol } from './isSymbol.js';

export const isOptionalSymbol = maybeUndefined(isSymbol);

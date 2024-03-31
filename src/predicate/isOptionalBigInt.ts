import { maybeUndefined } from '../predicate-factory/maybeUndefined.js';

import { isBigInt } from './isBigInt.js';

export const isOptionalBigInt = maybeUndefined(isBigInt);

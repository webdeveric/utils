import { maybeUndefined } from './factory/maybeUndefined.js';
import { isBigInt } from './isBigInt.js';

export const isOptionalBigInt = maybeUndefined(isBigInt);

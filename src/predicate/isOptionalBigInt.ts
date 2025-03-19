import { optional } from './factory/optional.js';
import { isBigInt } from './isBigInt.js';

export const isOptionalBigInt = optional(isBigInt);

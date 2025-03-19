import { optional } from './factory/optional.js';
import { isNumber } from './isNumber.js';

export const isOptionalNumber = optional(isNumber);

import { optional } from './factory/optional.js';
import { isString } from './isString.js';

export const isOptionalString = optional(isString);

import { optional } from './factory/optional.js';
import { isArray } from './isArray.js';

export const isOptionalArray = optional(isArray);

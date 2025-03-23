import { optional } from './factory/optional.js';
import { isObject } from './isObject.js';

export const isOptionalObject = optional(isObject);

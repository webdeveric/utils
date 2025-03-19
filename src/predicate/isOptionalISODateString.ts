import { optional } from './factory/optional.js';
import { isISODateString } from './isISODateString.js';

export const isOptionalISODateString = optional(isISODateString);

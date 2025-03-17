import { everyItem } from './factory/everyItem.js';
import { isString } from './isString.js';

export const isStringArray = everyItem(isString);

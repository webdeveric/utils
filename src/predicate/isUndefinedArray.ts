import { everyItem } from './factory/everyItem.js';
import { isUndefined } from './isUndefined.js';

export const isUndefinedArray = everyItem(isUndefined);

import { everyItem } from './factory/everyItem.js';
import { isNumber } from './isNumber.js';

export const isNumberArray = everyItem(isNumber);

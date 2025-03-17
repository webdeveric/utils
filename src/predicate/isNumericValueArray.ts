import { everyItem } from './factory/everyItem.js';
import { isNumericValue } from './isNumericValue.js';

export const isNumericValueArray = everyItem(isNumericValue);

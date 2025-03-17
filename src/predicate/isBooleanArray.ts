import { everyItem } from './factory/everyItem.js';
import { isBoolean } from './isBoolean.js';

export const isBooleanArray = everyItem(isBoolean);

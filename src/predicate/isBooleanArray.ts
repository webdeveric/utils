import { everyItem } from '../predicate-factory/everyItem.js';

import { isBoolean } from './isBoolean.js';

export const isBooleanArray = everyItem(isBoolean);

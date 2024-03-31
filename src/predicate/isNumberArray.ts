import { everyItem } from '../predicate-factory/everyItem.js';

import { isNumber } from './isNumber.js';

export const isNumberArray = everyItem(isNumber);

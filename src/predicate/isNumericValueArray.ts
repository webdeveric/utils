import { everyItem } from '../predicate-factory/everyItem.js';

import { isNumericValue } from './isNumericValue.js';

export const isNumericValueArray = everyItem(isNumericValue);

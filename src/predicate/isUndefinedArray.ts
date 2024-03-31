import { everyItem } from '../predicate-factory/everyItem.js';

import { isUndefined } from './isUndefined.js';

export const isUndefinedArray = everyItem(isUndefined);

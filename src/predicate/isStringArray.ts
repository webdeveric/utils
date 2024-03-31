import { everyItem } from '../predicate-factory/everyItem.js';

import { isString } from './isString.js';

export const isStringArray = everyItem(isString);

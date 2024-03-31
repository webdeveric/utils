import { everyItem } from '../predicate-factory/everyItem.js';

import { isNull } from './isNull.js';

export const isNullArray = everyItem(isNull);

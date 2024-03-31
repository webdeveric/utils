import { everyItem } from '../predicate-factory/everyItem.js';

import { isBigInt } from './isBigInt.js';

export const isBigIntArray = everyItem(isBigInt);

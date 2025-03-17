import { everyItem } from './factory/everyItem.js';
import { isBigInt } from './isBigInt.js';

export const isBigIntArray = everyItem(isBigInt);

import { everyItem } from './factory/everyItem.js';
import { isSymbol } from './isSymbol.js';

export const isSymbolArray = everyItem(isSymbol);

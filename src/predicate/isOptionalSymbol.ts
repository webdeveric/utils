import { maybeUndefined } from './factory/maybeUndefined.js';
import { isSymbol } from './isSymbol.js';

export const isOptionalSymbol = maybeUndefined(isSymbol);

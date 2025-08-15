import { isDateInputString } from './isDateInputString.js';

import type { TypePredicateFn } from '../types/functions.js';

/**
 * Determine if `input` is a valid date string.
 *
 * @deprecated Use `isDateInputString` instead.
 */
export const isDateString: TypePredicateFn<string> = isDateInputString;

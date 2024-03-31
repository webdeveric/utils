import { createStringMatchingPredicate } from '../predicate-factory/createStringMatchingPredicate.js';

import type { NumericString } from '../types/common.js';

export const isDigitsString = createStringMatchingPredicate<NumericString>(/^\d+$/);

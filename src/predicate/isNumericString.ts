import { createStringMatchingPredicate } from '../predicate-factory/createStringMatchingPredicate.js';

import type { NumericString } from '../types/common.js';

export const isNumericString = createStringMatchingPredicate<NumericString>(/^[-+]?\d+(\.\d+)?$/);

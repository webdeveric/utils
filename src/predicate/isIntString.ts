import { matching } from './factory/matching.js';

import type { NumericString } from '../types/common.js';

export const isIntString = matching<NumericString>(/^[-+]?\d+$/);

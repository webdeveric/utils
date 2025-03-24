import { bench } from 'vitest';

import { isPrimitive } from '../src/predicate/isPrimitive.js';

import type { Primitive } from '../src/index.js';

const data: Primitive[] = ['string', 1, 1n, true, undefined, Symbol('test'), null];

bench('isPrimitive()', () => {
  data.forEach(isPrimitive);
});

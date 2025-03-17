import { bench } from 'vitest';

import { isIterable } from '../src/predicate/isIterable.js';

const data: unknown[] = [];

bench('isIterable()', () => {
  isIterable(data);
});

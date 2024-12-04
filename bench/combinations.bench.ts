import { bench } from 'vitest';

import { combinations } from '../src/combinations.js';
import { counter } from '../src/counter.js';

bench('combinations()', () => {
  combinations({
    parents: [0, 1, 2],
    spouse: [0, 1],
    kids: counter(0, 10),
  });
});

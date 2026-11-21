import { test } from 'vitest';

import { isIterable } from '../src/predicate/isIterable.js';

const data: unknown[] = [];

test('isIterable()', async ({ bench }) => {
  await bench('isIterable()', () => {
    isIterable(data);
  }).run();
});

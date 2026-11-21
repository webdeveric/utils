import { test } from 'vitest';

import { getOwnProperties } from '../src/getOwnProperties.js';

test('getOwnProperties()', async ({ bench }) => {
  await bench('getOwnProperties()', () => {
    getOwnProperties(globalThis);
  }).run();
});

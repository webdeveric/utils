import { bench } from 'vitest';

import { getOwnProperties } from '../src/getOwnProperties.js';

bench('getOwnProperties()', () => {
  getOwnProperties(globalThis);
});

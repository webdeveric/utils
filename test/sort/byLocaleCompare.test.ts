import { describe, expect, it } from 'vitest';

import { byLocaleCompare } from '../../src/sort/byLocaleCompare.js';

describe('byLocaleCompare()', () => {
  it('compares by string localeCompare', () => {
    expect(['c', 'b', 'a'].sort(byLocaleCompare)).toEqual(['a', 'b', 'c']);
  });
});

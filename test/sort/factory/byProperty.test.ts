import { describe, expect, it } from 'vitest';

import { byLocaleCompare } from '../../../src/sort/byLocaleCompare.js';
import { byProperty } from '../../../src/sort/factory/byProperty.js';

describe('byProperty()', () => {
  it('returns a CompareFn', () => {
    expect(byProperty<{ name: string }>(() => 0, 'name')).instanceOf(Function);
  });

  it('Sorts using the returned CompareFn', () => {
    expect(
      [
        {
          name: 'b',
        },
        {
          name: 'a',
        },
      ].sort(byProperty(byLocaleCompare, 'name')),
    ).toEqual([
      {
        name: 'a',
      },
      {
        name: 'b',
      },
    ]);
  });
});

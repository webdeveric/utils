import { describe, it, expect } from 'vitest';

import { getOwnPaths } from '../src/getOwnPaths.js';

describe('getOwnPaths()', () => {
  it('Returns an array of own property paths', () => {
    const paths = getOwnPaths({
      name: 'Test',
      job: {
        title: 'Tester',
      },
      items: [
        {
          name: 'laptop',
          type: 'computer',
        },
      ],
    });

    expect(paths).toEqual(['name', 'job', 'job.title', 'items', 'items.0', 'items.0.name', 'items.0.type']);
  });

  it('Only gets own paths', () => {
    expect(
      getOwnPaths(
        Object.setPrototypeOf(
          {
            childProperty: true,
          },
          {
            parentProperty: true,
          },
        ),
      ),
    ).toEqual(['childProperty']);
  });
});

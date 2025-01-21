import { describe, it, expect } from 'vitest';

import { getPaths } from '../src/getPaths.js';

describe('getPaths()', () => {
  it('Returns an array of property paths', () => {
    const paths = getPaths({
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

  it('Gets all paths up the prototype chain', () => {
    expect(
      getPaths(
        Object.setPrototypeOf(
          {
            childProperty: true,
          },
          {
            parentProperty: true,
          },
        ),
      ),
    ).toEqual(['childProperty', 'parentProperty']);
  });
});

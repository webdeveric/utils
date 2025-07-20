import { describe, it, expectTypeOf } from 'vitest';

import { has } from '../src/has.js';

describe('has()', () => {
  describe('Is a type predicate', () => {
    it('Handles unknown input', () => {
      const input: unknown = {
        firstName: 'Test',
      };

      if (has(input, 'firstName')) {
        expectTypeOf<typeof input>().toEqualTypeOf<{ firstName: unknown }>();
      }
    });

    it('Handles tuple input', () => {
      const data = ['test'] as const satisfies string[];

      if (has(data, 0)) {
        expectTypeOf<typeof data>().toEqualTypeOf<['test']>();
      }
    });

    it('Handles array input', () => {
      const data: string[] = ['test'];

      if (has(data, 0)) {
        expectTypeOf<typeof data>().toEqualTypeOf<string[]>();
      }
    });
  });
});

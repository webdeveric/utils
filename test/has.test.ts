import { describe, it, expect } from 'vitest';

import { has } from '../src/has.js';

describe('has()', () => {
  it('returns boolean indicating the path exists', () => {
    const input: Record<string, string> = {
      firstName: 'Test',
    };

    expect(has(input, 'firstName')).toBe(true);
    expect(has(input, 'lastName')).toBe(false);

    if (has(input, 'firstName')) {
      input['lastName'] = 'Testerson';
    }

    expect(input).toEqual({
      firstName: 'Test',
      lastName: 'Testerson',
    });
  });

  it('is aware of input type', () => {
    expect.assertions(0);

    const input = {
      name: {
        first: 'Test',
        last: 'Testerson',
      },
    } as const;

    if (has(input, 'name.middle')) {
      // Never happens, but TypeScript thinks it does
      expect(input.name.middle).toBe(undefined);
    }
  });

  it('Handles `unknown` input', () => {
    const input: unknown = {
      name: 'Test',
    };

    expect(has(input, 'name')).toBe(true);
  });

  it('Handles array input', () => {
    expect(has(['a', 'b', 'c'], 0)).toBe(true);
  });

  it.each([() => true, null, undefined, true, 1, 1n, 'A', Symbol('test')])(
    'Returns false for non-objects: %s',
    (input) => {
      expect(has(input, 'some.path')).toBe(false);
    },
  );

  it('Returns false for empty path', () => {
    expect(has({ data: true }, '')).toBe(false);
  });
});

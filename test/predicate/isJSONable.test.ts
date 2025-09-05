import { describe, expect, it } from 'vitest';

import { isJSONable } from '../../src/predicate/isJSONable.js';

import type { JsonValue } from '../../src/index.js';

describe('isJSONable()', () => {
  it('should return true for objects with a toJSON method', () => {
    const obj = {
      toJSON(key: string): JsonValue {
        return { key };
      },
    };

    expect(isJSONable(obj)).toBe(true);
  });

  it.each([{}, null, true, 'test', 123])('should return false for objects without a toJSON method: %j', (input) => {
    expect(isJSONable(input)).toBe(false);
  });
});

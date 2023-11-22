import { describe, expect, it } from 'vitest';

import { inRange } from '../src/inRange.js';

describe('inRange()', () => {
  it('Returns boolean indicating input is between min and max', () => {
    expect(inRange(1, 0, 2)).toBeTruthy();
    expect(inRange(1n, 0, 2)).toBeTruthy();
    expect(inRange(20, 10n, 100)).toBeTruthy();
    expect(inRange(50, 10, 100n)).toBeTruthy();
    expect(inRange('some string', 1, 10)).toBeFalsy();
    expect(inRange(undefined, 1, 10)).toBeFalsy();
  });
});

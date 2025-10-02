import { setTimeout } from 'timers/promises';

import { describe, it, expect } from 'vitest';

import { isTimeoutError } from '../../src/predicate/isTimeoutError.js';

describe('isTimeoutError()', () => {
  it('should return true for TimeoutError', () => {
    const error = new DOMException('The operation timed out.', 'TimeoutError');

    expect(isTimeoutError(error)).toBe(true);
  });

  it('recognizes timeouts from AbortSignal', async () => {
    const signal = AbortSignal.timeout(0);

    await setTimeout(1);

    try {
      signal.throwIfAborted();
    } catch (error) {
      expect(isTimeoutError(error)).toBe(true);
    }
  });
});

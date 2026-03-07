import { describe, it, expect } from 'vitest';

import { isTimeoutError } from '../../src/predicate/isTimeoutError.js';

describe('isTimeoutError()', () => {
  it('should return true for TimeoutError', () => {
    const error = new DOMException('The operation timed out.', 'TimeoutError');

    expect(isTimeoutError(error)).toBe(true);
  });

  it('recognizes timeouts from AbortSignal', async () => {
    const signal = AbortSignal.timeout(1);

    await new Promise<void>((resolve) => {
      signal.addEventListener('abort', () => resolve(), { once: true });
    });

    try {
      signal.throwIfAborted();
    } catch (error) {
      expect(isTimeoutError(error)).toBe(true);
    }
  });
});

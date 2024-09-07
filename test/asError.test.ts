import { describe, it, expect } from 'vitest';

import { asError } from '../src/asError.js';

describe('asError()', () => {
  it('Returns an Error', () => {
    const error = new Error('test');

    expect(asError(error)).toBe(error);
  });

  it('Creates an Error from input', () => {
    expect(asError('test')).toBeInstanceOf(Error);
  });
});

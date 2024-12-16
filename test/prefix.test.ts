import { describe, it, expect } from 'vitest';

import { prefix } from '../src/prefix.js';

describe('prefix()', () => {
  it('Returns a string with the provided prefix', () => {
    expect(prefix(':', 8080)).toEqual(':8080');
    expect(prefix('> ', 'hi')).toEqual('> hi');
  });

  it('Returns the default value with value is empty', () => {
    expect(prefix(':', null, 'default')).toEqual('default');
    expect(prefix(':', void 0, 'default')).toEqual('default');
    expect(prefix(':', '', 'default')).toEqual('default');
  });
});

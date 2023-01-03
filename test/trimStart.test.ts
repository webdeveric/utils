import { describe, it, expect } from 'vitest';

import { trimStart } from '../src/trimStart';

describe('trimStart', () => {
  it('removes char from start of string', () => {
    const str = trimStart('///some/path', '/');

    expect(str).toBe('some/path');
  });

  it('defaults to whitespace', () => {
    const str = trimStart('   some/path');

    expect(str).toBe('some/path');
  });
});

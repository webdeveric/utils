import { describe, it, expect } from 'vitest';

import { trimEnd } from '../src/trimEnd';

describe('trimEnd', () => {
  it('removes char from end of string', () => {
    const str = trimEnd('some/path///', '/');

    expect(str).toBe('some/path');
  });

  it('defaults to whitespace', () => {
    const str = trimEnd('some/path   ');

    expect(str).toBe('some/path');
  });
});

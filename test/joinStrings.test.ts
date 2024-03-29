import { describe, it, expect } from 'vitest';

import { joinStrings } from '../src/joinStrings.js';

describe('joinStrings', () => {
  it('joins two strings with default separator', () => {
    const str = joinStrings('some', 'path');

    expect(str).toBe('some/path');
  });

  it('does not duplicate the separator', () => {
    const str = joinStrings('some|', '|thing', '|');

    expect(str).toBe('some|thing');
  });
});

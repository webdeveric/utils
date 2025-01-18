import { describe, expect, it } from 'vitest';

import { stripWhitespace } from '../src/stripWhitespace.js';

describe('stripWhitespace()', () => {
  it('Removes all whitespace from a string', () => {
    expect(stripWhitespace('')).toEqual('');
    expect(stripWhitespace('  test  ')).toEqual('test');
  });
});

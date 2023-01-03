import { describe, it, expect } from 'vitest';

import { looksLikeURL } from '../src/looksLikeURL.js';

describe('looksLikeURL()', () => {
  it('Returns true if a string starts with a URL protocol', () => {
    expect(looksLikeURL('http://example.com/')).toBeTruthy();
    expect(looksLikeURL('https://example.com/')).toBeTruthy();
    expect(looksLikeURL('ftp://example.com/')).toBeTruthy();
    expect(looksLikeURL('example.com')).toBeFalsy();
  });
});

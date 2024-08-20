import { describe, it, expect } from 'vitest';

import { deepDecodeURI } from '../src/deepDecodeURI.js';

describe('deepDecodeURI()', () => {
  it('Returns early when URI is empty', () => {
    expect(deepDecodeURI('')).toEqual('');
  });

  it('Fully decodes URIs', () => {
    const uri = 'https://example.com/folder with spaces';

    expect(deepDecodeURI(encodeURI(encodeURI(uri)))).toEqual(uri);
  });
});

import { describe, it, expect } from 'vitest';

import { hasSameOrigin } from '../src/hasSameOrigin.js';

describe('hasSameOrigin()', () => {
  it('Returns true when the origins match', () => {
    expect(hasSameOrigin('https://example.com/a', 'https://example.com/b')).toBe(true);
  });

  it('Returns false when the protocols differ', () => {
    expect(hasSameOrigin('https://example.com', 'http://example.com')).toBe(false);
  });

  it('Returns false when the hostnames differ', () => {
    expect(hasSameOrigin('https://example.com', 'https://example.org')).toBe(false);
  });

  it('Returns false when the ports differ', () => {
    expect(hasSameOrigin('https://example.com:8080', 'https://example.com:8081')).toBe(false);
  });

  it('Ignores paths, query strings, and hashes', () => {
    expect(hasSameOrigin('https://example.com/a?x=1#y', 'https://example.com/b?z=2#w')).toBe(true);
  });

  it('Accepts URL instances', () => {
    expect(hasSameOrigin(new URL('https://example.com/a'), new URL('https://example.com/b'))).toBe(true);
  });

  it('Accepts a mix of string and URL instance', () => {
    expect(hasSameOrigin('https://example.com/a', new URL('https://example.com/b'))).toBe(true);
  });

  it('Throws when given an invalid URL', () => {
    expect(() => hasSameOrigin('not a url', 'https://example.com')).toThrow();
  });
});

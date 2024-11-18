import { describe, expect, it } from 'vitest';

import { escapeRegExp } from '../src/escapeRegExp.js';

describe('escapeRegExp()', () => {
  it('escapes special regexp characters', () => {
    expect(escapeRegExp('')).toBe('');
    expect(escapeRegExp('test')).toBe('test');
    expect(escapeRegExp('\\')).toBe('\\\\');
    expect(escapeRegExp('image.jpg')).toBe('image\\.jpg');
    expect(escapeRegExp('star*')).toBe('star\\*');
    expect(escapeRegExp('{}')).toBe('\\{\\}');
    expect(escapeRegExp('[]')).toBe('\\[\\]');
    expect(escapeRegExp('()')).toBe('\\(\\)');
    expect(escapeRegExp('^|+$')).toBe('\\^\\|\\+\\$');
  });
});

import { describe, it, expect } from 'vitest';

import { stripIndent } from '../src/stripIndent.js';

describe('stripIndent()', () => {
  it('Removes the given indent after each line break', () => {
    expect(stripIndent('line 1\n  line 2\n  line 3', '  ')).toBe('line 1\nline 2\nline 3');
  });

  it('Only removes the indent immediately following a line break, not elsewhere in the line', () => {
    expect(stripIndent('  line 1\n  line 2', '  ')).toBe('  line 1\nline 2');
  });

  it('Only removes indent that exactly matches', () => {
    expect(stripIndent('line 1\n    line 2', '  ')).toBe('line 1\n  line 2');
  });

  it('Does not remove indentation shorter than the given indent', () => {
    expect(stripIndent('line 1\n line 2', '  ')).toBe('line 1\n line 2');
  });

  it('Handles CRLF line breaks', () => {
    expect(stripIndent('line 1\r\n  line 2\r\n  line 3', '  ')).toBe('line 1\r\nline 2\r\nline 3');
  });

  it('Handles CR line breaks', () => {
    expect(stripIndent('line 1\r  line 2\r  line 3', '  ')).toBe('line 1\rline 2\rline 3');
  });

  it('Handles tabs as the indent', () => {
    expect(stripIndent('line 1\n\tline 2\n\tline 3', '\t')).toBe('line 1\nline 2\nline 3');
  });

  it('Returns the input unchanged when the indent is an empty string', () => {
    expect(stripIndent('line 1\n  line 2', '')).toBe('line 1\n  line 2');
  });

  it('Returns the input unchanged when there is nothing to strip', () => {
    expect(stripIndent('line 1\nline 2', '  ')).toBe('line 1\nline 2');
  });

  it('Returns an empty string for empty input', () => {
    expect(stripIndent('', '  ')).toBe('');
  });

  it('Strips indentation from multiple consecutive line breaks', () => {
    expect(stripIndent('line 1\n  \n  line 2', '  ')).toBe('line 1\n\nline 2');
  });
});

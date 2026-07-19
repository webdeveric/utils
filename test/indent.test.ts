import { describe, it, expect } from 'vitest';

import { indent } from '../src/indent.js';

describe('indent()', () => {
  it('Adds the given indent after each line break', () => {
    expect(indent('line 1\nline 2\nline 3', '  ')).toBe('  line 1\n  line 2\n  line 3');
  });

  it('Adds indent before the first line', () => {
    expect(indent('line 1\nline 2', '  ')).toBe('  line 1\n  line 2');
  });

  it('Handles CRLF line breaks', () => {
    expect(indent('line 1\r\nline 2\r\nline 3', '  ')).toBe('  line 1\r\n  line 2\r\n  line 3');
  });

  it('Handles CR line breaks', () => {
    expect(indent('line 1\rline 2\rline 3', '  ')).toBe('  line 1\r  line 2\r  line 3');
  });

  it('Handles tabs as the indent', () => {
    expect(indent('line 1\nline 2\nline 3', '\t')).toBe('\tline 1\n\tline 2\n\tline 3');
  });

  it('Returns the input unchanged when the indent is an empty string', () => {
    expect(indent('line 1\nline 2', '')).toBe('line 1\nline 2');
  });

  it('Only adds the indent prefix when there are no line breaks', () => {
    expect(indent('line 1', '  ')).toBe('  line 1');
  });

  it('Returns just the indent for empty input', () => {
    expect(indent('', '  ')).toBe('  ');
  });

  it('Indents multiple consecutive line breaks', () => {
    expect(indent('line 1\n\nline 2', '  ')).toBe('  line 1\n  \n  line 2');
  });
});

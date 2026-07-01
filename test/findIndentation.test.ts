import { describe, it, expect } from 'vitest';

import { findIndentation } from '../src/findIndentation.js';

describe('findIndentation()', () => {
  it('Finds the indentation of the first non-blank line', () => {
    expect(findIndentation(['  line 1', '  line 2'])).toBe('  ');
  });

  it('Skips leading blank lines', () => {
    expect(findIndentation(['', '   ', '  line 1'])).toBe('  ');
  });

  it('Returns undefined when the first non-blank line has no indentation', () => {
    expect(findIndentation(['line 1', '  line 2'])).toBeUndefined();
  });

  it('Returns undefined when all lines are blank', () => {
    expect(findIndentation(['', '   ', ''])).toBeUndefined();
  });

  it('Returns undefined for an empty array', () => {
    expect(findIndentation([])).toBeUndefined();
  });

  it('Handles tabs as indentation', () => {
    expect(findIndentation(['\tline 1', '\tline 2'])).toBe('\t');
  });

  it('Handles mixed tabs and spaces as indentation', () => {
    expect(findIndentation(['\t  line 1'])).toBe('\t  ');
  });

  it('Skips a leading line break before matching indentation', () => {
    expect(findIndentation(['\n  line 1'])).toBe('  ');
  });

  it('Skips a leading CRLF line break before matching indentation', () => {
    expect(findIndentation(['\r\n  line 1'])).toBe('  ');
  });

  it('Skips a leading CR line break before matching indentation', () => {
    expect(findIndentation(['\r  line 1'])).toBe('  ');
  });
});

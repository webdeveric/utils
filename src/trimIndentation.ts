import { NEWLINE_RAW_PATTERN } from './constants.js';
import { findIndentation } from './findIndentation.js';
import { stripIndent } from './stripIndent.js';

/**
 * Remove common leading indentation from every line in `input` and trim the result.
 *
 * @example
 * ```ts
 * trimIndentation('  foo\n  bar\n'); // 'foo\nbar'
 * ```
 */
export function trimIndentation(input: string): string {
  const whiteSpace = findIndentation(input.split(new RegExp(NEWLINE_RAW_PATTERN)));

  return (whiteSpace ? stripIndent(input, whiteSpace) : input).trim();
}

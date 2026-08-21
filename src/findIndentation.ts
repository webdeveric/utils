import { INDENT_CHAR_RAW_PATTERN, NEWLINE_RAW_PATTERN } from './constants.js';

const blankLinePattern = /^\s*$/;
const leadingWhitespacePattern = new RegExp(
  String.raw`^(?:${NEWLINE_RAW_PATTERN})?(?<whiteSpace>${INDENT_CHAR_RAW_PATTERN}+)`,
);

/**
 * Find indentation on first line that isn't whitespace only.
 *
 * @example
 * ```ts
 * findIndentation(['  hello', '  world']); // '  '
 * ```
 */
export function findIndentation(lines: readonly string[]): string | undefined {
  return lines.find((line) => !blankLinePattern.test(line))?.match(leadingWhitespacePattern)?.groups?.['whiteSpace'];
}

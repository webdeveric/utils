import { INDENT_CHAR_RAW_PATTERN, NEWLINE_RAW_PATTERN } from './constants.js';

/**
 * Find indentation on first line that isn't whitespace only.
 */
export function findIndentation(lines: readonly string[]): string | undefined {
  return lines
    .find((line) => !/^\s*$/.test(line))
    ?.match(new RegExp(String.raw`^(?:${NEWLINE_RAW_PATTERN})?(?<whiteSpace>${INDENT_CHAR_RAW_PATTERN}+)`))?.groups?.[
    'whiteSpace'
  ];
}

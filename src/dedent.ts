import { INDENT_CHAR_RAW_PATTERN, NEWLINE_RAW_PATTERN } from './constants.js';
import { findIndentation } from './findIndentation.js';
import { stripIndent } from './stripIndent.js';

/**
 * This is a tagged template function that removes common leading indentation from
 * each line, re-indents any interpolated multi-line values to match, and trims
 * leading/trailing whitespace from the result.
 *
 * @example
 * ```ts
 * const value = 'World';
 *
 * dedent`
 *   Hello, ${value}!
 * `; // 'Hello, World!'
 * ```
 */
export const dedent = (raw: readonly string[], ...values: unknown[]): string => {
  const indent = findIndentation(raw);

  if (!indent) {
    return String.raw({ raw }, ...values).trim();
  }

  const trailingWhitespace = new RegExp(String.raw`(?:${NEWLINE_RAW_PATTERN})(?<indent>${INDENT_CHAR_RAW_PATTERN}*)$`);
  const newlinePattern = new RegExp(NEWLINE_RAW_PATTERN, 'g');

  const lines = raw.map((line) => stripIndent(line, indent));

  return String.raw(
    { raw: lines },
    ...values.map((value, index) => {
      const extraIndent = lines[index]?.match(trailingWhitespace)?.groups?.['indent'];

      return extraIndent ? String(value).replaceAll(newlinePattern, `$&${extraIndent}`) : value;
    }),
  ).trim();
};

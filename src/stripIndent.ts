import { NEWLINE_RAW_PATTERN } from './constants.js';

/**
 * Remove `indent` immediately following every line break in `input`.
 *
 * @example
 * ```ts
 * stripIndent('\n  foo\n  bar', '  '); // '\nfoo\nbar'
 * ```
 */
export function stripIndent(input: string, indent: string): string {
  return input.replaceAll(new RegExp(String.raw`(?<newLine>${NEWLINE_RAW_PATTERN})${indent}`, 'g'), '$<newLine>');
}

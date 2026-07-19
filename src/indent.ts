import { NEWLINE_RAW_PATTERN } from './constants.js';

/**
 * Add `indent` before each line in `input`.
 *
 * @example
 * ```ts
 * indent('one\ntwo\nthree', '  '); // '  one\n  two\n  three'
 * ```
 */
export function indent(input: string, indentation: string): string {
  return (
    indentation +
    input.replaceAll(new RegExp(String.raw`(?<newLine>${NEWLINE_RAW_PATTERN})`, 'g'), `$<newLine>${indentation}`)
  );
}

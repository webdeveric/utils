/**
 * Get the number of Unicode code points in `input`, unlike `string.length` which counts UTF-16 code units.
 *
 * @example
 * ```ts
 * codePointLength('hello'); // 5
 * codePointLength('😀'); // 1
 * '😀'.length; // 2
 * ```
 */
export function codePointLength(input: string): number {
  return [...input].length;
}

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
  let count = 0;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  for (const _ of input) {
    count++;
  }

  return count;
}

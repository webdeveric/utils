/**
 * Count how many times `charCode` occurs in `input`.
 *
 * @example
 * ```ts
 * countCharCode('hello', 'l'.charCodeAt(0)); // 2
 * ```
 */
export function countCharCode(input: string, charCode: number): number {
  let count = 0;

  for (let index = 0, length = input.length; index < length; ++index) {
    if (input.charCodeAt(index) === charCode) {
      ++count;
    }
  }

  return count;
}

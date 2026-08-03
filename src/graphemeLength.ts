const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

/**
 * Get the number of grapheme clusters (user-perceived characters) in `input`, unlike `string.length` which counts UTF-16 code units.
 *
 * @example
 * ```ts
 * graphemeLength('hello'); // 5
 * graphemeLength('👨‍👩‍👧‍👦'); // 1
 * '👨‍👩‍👧‍👦'.length; // 11
 * ```
 */
export function graphemeLength(input: string): number {
  let count = 0;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  for (const _ of segmenter.segment(input)) {
    count++;
  }

  return count;
}

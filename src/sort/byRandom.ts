/**
 * Randomly return -1, 0, or 1. This is an easy way to shuffle an array.
 *
 * @example
 * ```ts
 * [1, 2, 3, 4, 5].sort(byRandom); // shuffled order, e.g. [3, 1, 5, 2, 4]
 * ```
 */
export const byRandom = (): number => {
  let value: number;

  const data = new Uint8Array(1);

  do {
    value = crypto.getRandomValues(data)[0]!;
  } while (value >= 252); // Avoid modulo bias

  return (value % 3) - 1;
};

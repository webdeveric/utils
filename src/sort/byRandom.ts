/**
 * Randomly return -1, 0, or 1. This is an easy way to shuffle an array.
 */
export const byRandom = (): number => {
  let value: number;

  do {
    value = crypto.getRandomValues(new Uint8Array(1))[0]!;
  } while (value >= 252); // Avoid modulo bias

  return (value % 3) - 1;
};

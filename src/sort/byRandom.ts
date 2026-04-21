/**
 * Randomly return -1, 0, or 1. This is an easy way to shuffle an array.
 */
export const byRandom = (): number => {
  let value: number;

  const data = new Uint8Array(1);

  do {
    value = crypto.getRandomValues(data)[0]!;
  } while (value >= 252); // Avoid modulo bias

  return (value % 3) - 1;
};

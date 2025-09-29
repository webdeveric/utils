/**
 * Randomly return -1, 0, or 1. This is an easy way to shuffle an array.
 */
export const byRandom = (): number => (crypto.getRandomValues(new Uint8Array(1))[0]! % 3) - 1;

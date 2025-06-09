export function* chunk<T>(items: T[], chunkSize: number): Generator<T[], undefined, undefined> {
  if (!Number.isSafeInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError('Chunk size must be an integer greater than 0');
  }

  const length = items.length;

  if (length === 0) {
    yield items;

    return;
  }

  for (let i = 0; i < length; i += chunkSize) {
    yield items.slice(i, i + chunkSize);
  }
}

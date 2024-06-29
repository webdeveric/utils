export function* unique<T>(
  items: Iterable<T>,
  getIdentity: (item: T) => unknown = item => item,
): Generator<T, undefined, undefined> {
  if (items instanceof Set) {
    yield* items;
  } else {
    const ids = new Set<unknown>();

    for (const item of items) {
      const id = getIdentity(item);

      if (!ids.has(id)) {
        ids.add(id);

        yield item;
      }
    }
  }
}

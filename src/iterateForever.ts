/**
 * Repeatedly yield the items in `items`, looping forever.
 *
 * @example
 * ```ts
 * const iterator = iterateForever([1, 2, 3]);
 *
 * iterator.next().value; // 1
 * iterator.next().value; // 2
 * iterator.next().value; // 3
 * iterator.next().value; // 1
 * ```
 */
export function* iterateForever<T>(items: Iterable<T>): Generator<T, undefined, undefined> {
  while (true) {
    yield* items;
  }
}

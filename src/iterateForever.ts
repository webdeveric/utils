export function* iterateForever<T>(items: Iterable<T>): Generator<T, undefined, undefined> {
  while (true) {
    yield* items;
  }
}

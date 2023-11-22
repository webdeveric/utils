export function* counter(start = 0, end = Infinity): Generator<number> {
  let count = start;

  do {
    yield count++;
  } while (count <= end);
}

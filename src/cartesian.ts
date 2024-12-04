/**
 * @see https://en.wikipedia.org/wiki/Cartesian_product
 */
export function* cartesian<T>(...input: T[][]): Generator<T[]> {
  const [head, ...tail] = input;

  if (!Array.isArray(head)) {
    return [[]];
  }

  const remainder = tail.length ? cartesian(...tail) : [[]];

  for (const rest of remainder) {
    for (const item of head) {
      yield [item, ...rest];
    }
  }
}

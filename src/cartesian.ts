/**
 * Lazily yield the Cartesian product of the given arrays.
 *
 * @see {@link https://en.wikipedia.org/wiki/Cartesian_product}
 *
 * @example
 * ```ts
 * [...cartesian([1, 2], ['a', 'b'])]; // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * ```
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

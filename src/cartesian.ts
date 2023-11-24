// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* cartesian(...input: any[][]): Generator<any[]> {
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

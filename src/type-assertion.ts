export function assertsIsInteger(input: unknown): asserts input is number {
  if (! Number.isInteger(input)) {
    throw new TypeError('input is not an integer');
  }
}

export function assertsIsFiniteNumber(input: unknown): asserts input is number {
  if (! Number.isFinite(input)) {
    throw new TypeError('input is not a finite number');
  }
}

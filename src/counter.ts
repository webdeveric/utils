export function* counter(start = 0, end = Infinity, step = 1): Generator<number> {
  if (step === 0) {
    throw new TypeError('step cannot be zero');
  }

  let count = start;

  do {
    yield count;

    count += step;
  } while (step > 0 ? count <= end : count >= end);
}

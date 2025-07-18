export function* pathParts(input: PropertyKey): Generator<PropertyKey> {
  if (input === '') {
    return;
  }

  if (typeof input !== 'string') {
    yield input;

    return;
  }

  const regexp = /\w+/g;

  const iterator = input.matchAll(regexp);

  for (const part of iterator) {
    yield part[0];
  }
}

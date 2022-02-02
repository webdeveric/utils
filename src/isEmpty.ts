export function isEmpty(input: unknown): boolean {
  if (typeof input === 'undefined' || input === null || (typeof input === 'string' && ! input.length)) {
    return true;
  }

  if (Array.isArray(input)) {
    return input.length === 0;
  }

  if (typeof input === 'object') {
    return Object.keys(input).length === 0;
  }

  return false;
}

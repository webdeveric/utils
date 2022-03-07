export function isObject(input: unknown): boolean {
  return typeof input === 'object' && input !== null;
}

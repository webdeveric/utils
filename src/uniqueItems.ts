export function uniqueItems<T>(data: T[]): T[] {
  return [...new Set<T>(data)];
}

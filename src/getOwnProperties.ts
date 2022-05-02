export function getOwnProperties<T, K extends keyof T>(data: T): K[] {
  return [...Object.getOwnPropertyNames(data), ...Object.getOwnPropertySymbols(data)] as K[];
}

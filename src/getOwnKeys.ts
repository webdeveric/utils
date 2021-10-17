export function getOwnKeys<T>(data: T): (keyof T)[] {
  return [
    ...Object.getOwnPropertyNames(data),
    ...Object.getOwnPropertySymbols(data),
  ] as (keyof T)[];
}

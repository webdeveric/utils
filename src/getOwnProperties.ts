/**
 * Get `data`'s own property names and symbols.
 *
 * @example
 * ```ts
 * getOwnProperties({ a: 1, b: 2 }); // ['a', 'b']
 * ```
 */
export function getOwnProperties<T, K extends keyof T>(data: T): K[] {
  return [...Object.getOwnPropertyNames(data), ...Object.getOwnPropertySymbols(data)] as K[];
}

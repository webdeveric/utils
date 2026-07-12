/**
 * Get `data`'s own enumerable property keys.
 *
 * @example
 * ```ts
 * getOwnKeys({ a: 1, b: 2 }); // ['a', 'b']
 * ```
 */
export function getOwnKeys<T extends Parameters<typeof Object.keys>[0], K extends keyof T>(data: T): K[] {
  return Object.keys(data) as K[];
}

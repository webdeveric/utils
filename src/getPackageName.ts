/**
 * Extract the package name, including any scope, from `input`.
 *
 * @example
 * ```ts
 * getPackageName('@scope/name/sub/path'); // '@scope/name'
 * getPackageName('lodash/fp'); // 'lodash'
 * ```
 */
export function getPackageName(input: string): string | undefined {
  return /^(?<pkg>(?:(?<scope>@[^/]+)\/)?(?<name>[a-z][^/]+))/i.exec(input)?.groups?.['pkg'];
}

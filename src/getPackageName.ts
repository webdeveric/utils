export function getPackageName(input: string): string | undefined {
  return input.match(/^(?<pkg>(?:(?<scope>@[^/]+)\/)?(?<name>[a-z][^/]+))/i)?.groups?.pkg;
}

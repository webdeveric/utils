export function getPackageName(input: string): string | undefined {
  return /^(?<pkg>(?:(?<scope>@[^/]+)\/)?(?<name>[a-z][^/]+))/i.exec(input)?.groups?.['pkg'];
}

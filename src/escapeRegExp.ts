const pattern = /[.*+?^${}()|[\]\\]/g;

export function escapeRegExp(input: string): string {
  return input.length ? input.replace(pattern, '\\$&') : input;
}

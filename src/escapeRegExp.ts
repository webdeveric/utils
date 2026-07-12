const pattern = /[.*+?^${}()|[\]\\]/g;

/**
 * Escape RegExp special characters in `input`.
 *
 * @example
 * ```ts
 * escapeRegExp('a.b*c'); // 'a\\.b\\*c'
 * ```
 */
export function escapeRegExp(input: string): string {
  return input.length ? input.replace(pattern, '\\$&') : input;
}

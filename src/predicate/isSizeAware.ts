/**
 * Determine if `input` is a non-null object with a numeric `size` property.
 *
 * @example
 * ```ts
 * isSizeAware(new Set([1, 2])); // true
 * isSizeAware({}); // false
 * ```
 */
export const isSizeAware = (input: unknown): input is { size: number } =>
  input !== null && typeof input === 'object' && 'size' in input && typeof input.size === 'number';

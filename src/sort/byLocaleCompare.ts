/**
 * Compare two strings using `localeCompare`.
 *
 * @example
 * ```ts
 * ['banana', 'apple', 'cherry'].sort(byLocaleCompare); // ['apple', 'banana', 'cherry']
 * ```
 */
export const byLocaleCompare = (left: string, right: string): number => left.localeCompare(right);

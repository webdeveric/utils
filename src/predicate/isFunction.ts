/**
 * Determine if `input` is a function.
 *
 * @example
 * ```ts
 * isFunction(() => {}); // true
 * isFunction({}); // false
 * ```
 */
export const isFunction = (input: unknown): input is Function => typeof input === 'function';

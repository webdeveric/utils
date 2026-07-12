import { assume } from './assume.js';

/**
 * Always returns `true`, allowing `input` to be treated as `unknown` without any runtime checks.
 *
 * @example
 * ```ts
 * isUnknown(42); // true
 * isUnknown('hello'); // true
 * ```
 */
export const isUnknown = assume<unknown>;

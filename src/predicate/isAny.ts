import { assume } from './assume.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Always determine that `input` matches, regardless of its actual type.
 *
 * @example
 * ```ts
 * isAny(42); // true
 * isAny('hello'); // true
 * ```
 */
export const isAny = assume<any>;

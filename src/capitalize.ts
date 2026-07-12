/**
 * Capitalize the first letter of `word`.
 *
 * @example
 * ```ts
 * capitalize('hello'); // 'Hello'
 * ```
 */
export const capitalize = <const Type extends string>(word: Type): Capitalize<Type> =>
  (word.substring(0, 1).toUpperCase() + word.substring(1)) as Capitalize<Type>;

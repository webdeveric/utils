export const capitalize = <Type extends string>(word: Type): Capitalize<Type> =>
  (word.substring(0, 1).toUpperCase() + word.substring(1)) as Capitalize<Type>;

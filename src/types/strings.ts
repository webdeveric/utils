import type { Digit } from './numbers.js';

export type EmptyString = '';

export type Space = ' ';

export type AlphaCharacter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export type NumericCharacter = `${Digit}`;

export type AlphanumericCharacter = AlphaCharacter | Capitalize<AlphaCharacter> | NumericCharacter;

export type MaybePlural<T extends string> = T | `${T}s`;

export type StripWhitespace<Type extends string> = string extends Type
  ? Type
  : Type extends `${infer First}${infer Rest}`
    ? First extends Space
      ? StripWhitespace<Rest>
      : `${First}${StripWhitespace<Rest>}`
    : EmptyString;

export type AlphanumericOnly<Type extends string> = Type extends EmptyString
  ? EmptyString
  : Type extends `${infer First}${infer Rest}`
    ? First extends AlphanumericCharacter | Space
      ? `${First}${AlphanumericOnly<Rest>}`
      : Rest extends EmptyString
        ? Rest
        : `${Space}${AlphanumericOnly<Rest>}`
    : never;

export type Replace<
  Type extends string,
  Remove extends string,
  Replacement extends string,
> = Type extends `${infer First}${infer Rest}`
  ? First extends Remove
    ? `${Replacement}${Replace<Rest, Remove, Replacement>}`
    : `${First}${Replace<Rest, Remove, Replacement>}`
  : EmptyString;

export type Strip<Type extends string, Remove extends string> = Replace<Type, Remove, EmptyString>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type FirstChar<Type extends string> = Type extends `${infer First}${infer _Rest}` ? First : never;

export type AddSpaceAroundNumbers<Type extends string> = Type extends `${infer First}${infer Rest}`
  ? Rest extends EmptyString
    ? First
    : First extends AlphaCharacter | Capitalize<AlphaCharacter>
      ? FirstChar<Rest> extends NumericCharacter
        ? `${First}${Space}${AddSpaceAroundNumbers<Rest>}` // next char is number
        : `${First}${AddSpaceAroundNumbers<Rest>}` // next char is not number
      : First extends NumericCharacter
        ? FirstChar<Rest> extends AlphaCharacter | Capitalize<AlphaCharacter>
          ? `${First}${Space}${AddSpaceAroundNumbers<Rest>}` // alpha following number
          : `${First}${AddSpaceAroundNumbers<Rest>}` // number following number
        : `${First}${AddSpaceAroundNumbers<Rest>}` // Some other character was found
  : never; // Type not a string

export type CamelCase<
  Type extends string,
  Delimiter extends string = Space,
> = Type extends `${infer Left}${Delimiter}${infer Right}` ? `${Left}${CamelCase<Capitalize<Right>, Delimiter>}` : Type;

export type PascalCase<Type extends string, Delimiter extends string = Space> = Capitalize<
  CamelCase<AlphanumericOnly<AddSpaceAroundNumbers<Strip<Type, "'">>>, Delimiter>
>;

export type StringLength<Type extends string, Accumulator extends never[] = []> = string extends Type
  ? never
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Type extends `${infer _}${infer Rest}`
    ? StringLength<Rest, [never, ...Accumulator]>
    : Accumulator['length'];

import type { Branded } from './branded.js';

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#decimal_numbers
 */
export type DecimalNumberString = `${'-' | '+' | ''}${Digit}${number}`;

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#hexadecimal_numbers
 */
export type HexNumberString = `0${'x' | 'X'}${string}`;

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#octal_numbers
 */
export type OctalNumberString = `0${'o' | 'O'}${number}`;

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#binary_numbers
 */
export type BinaryNumberString = `0${'b' | 'B'}${number}`;

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings#exponentiation
 */
export type ExponentiationString = `${number}${'e' | 'E'}${number}`;

export type Int32 = Branded<number, 'Int32'>;

export type NumberRange =
  | [min: number]
  | [min: number, max: undefined]
  | [min: number, max: number]
  | [min: undefined, max: number];

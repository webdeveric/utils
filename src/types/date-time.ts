import type { Branded } from './branded.js';
import type { NumericString } from './common.js';

export type DateInput = ConstructorParameters<typeof Date>[0];

/**
 * This is used to represent a string can be used as input for a `Date` constructor.
 */
export type DateInputString = Branded<string, 'DateInputString'>;

export type YearString = Branded<NumericString<number>, 'YearString'>;

export type MonthString = Branded<NumericString<number>, 'MonthString'>;

export type DayString = Branded<NumericString<number>, 'DayString'>;

export type DateString = Branded<`${YearString}-${MonthString}-${DayString}`, 'DateString'>;

export type TimeString = Branded<`${number}:${number}:${number}`, 'TimeString'>;

/**
 * This type describes what is returned by the `toISOString()` method of the `Date` object.
 * It is a simplified format based on ISO 8601 and not a complete representation of the standard.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
 */
export type ISODateString = Branded<`${DateString}T${TimeString}.${number}Z`, 'ISODateString'>;

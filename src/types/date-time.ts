import type { Branded } from './branded';
import type { NumericString } from './common';

export type DateInput = ConstructorParameters<typeof Date>[0];

export type YearString = Branded<NumericString, 'YearString'>;

export type MonthString = Branded<NumericString, 'MonthString'>;

export type DayString = Branded<NumericString, 'DayString'>;

export type DateString = Branded<`${YearString}-${MonthString}-${DayString}`, 'DateString'>;

export type TimeString = Branded<`${number}:${number}:${number}`, 'TimeString'>;

export type ISODateString = Branded<`${DateString}T${TimeString}.${number}Z`, 'ISODateString'>;

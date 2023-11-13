import type { Branded } from './branded.js';

export type DateString = `${number}-${number}-${number}`;

export type TimeString = `${number}:${number}:${number}`;

export type ISODateString = Branded<`${DateString}T${TimeString}.${number}Z`, 'ISODateString'>;

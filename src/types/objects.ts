import type { KeyValueTuple } from './tuples.js';
import type { IfNever } from './utils.js';

export type Assign<Target, Source> = IfNever<Target, Source, Omit<Target, keyof (Target | Source)> & Source>;

export type Entries<T extends object> = {
  [P in keyof T]: KeyValueTuple<P, T[P]>;
}[keyof T];

export type NonNullableEntries<T extends object> = {
  [P in keyof T]: KeyValueTuple<P, NonNullable<T[P]>>;
}[keyof T];

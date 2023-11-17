/* eslint-disable @typescript-eslint/no-explicit-any */
export type JoinTuples<A extends unknown[], B extends unknown[]> = [...A, ...B];

export type RangeTuple<T> = [min: T, max: T];

export type RangeTupleDistributive<T> = T extends any ? [min: T, max: T] : never;

export type NumberRangeTuple = RangeTuple<number>;

export type KeyValueTuple<K extends PropertyKey = PropertyKey, V = unknown> = [key: K, value: V];

export type TupleToArray<T extends any[]> = T[number][];

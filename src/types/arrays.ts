/* eslint-disable @typescript-eslint/no-explicit-any */
export type First<T extends any[]> = T extends [infer Data, ...any[]] ? Data : never;

export type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

export type Head<T extends any[]> = T extends [...infer Data, any] ? Data : any[];

export type Tail<T extends any[]> = T extends [any, ...infer Data] ? Data : any[];

export type GetLength<A extends any[]> = A extends { length: infer L } ? L : never;

export type IfLength<A extends any[], L extends number, T, F> = GetLength<A> extends L ? T : F;

export type IfEmpty<A extends any[], T, F> = GetLength<A> extends 0 ? T : F;

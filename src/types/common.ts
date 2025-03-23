/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types */

import type { NotPromise } from './utils.js';

export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

/**
 * This is any number or bigint that has been stringified.
 */
export type NumericString<T extends string | number | bigint = number | bigint> = `${T}` extends `${number | bigint}`
  ? `${T}`
  : never;

export type NumericValue = number | bigint | NumericString;

export type JsonObject = { [key: string]: JsonValue };

export type JsonArray = JsonValue[];

export type JsonValue = string | number | boolean | null | object | JsonObject | JsonArray;

export type TypeOf = 'undefined' | 'object' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function';

export type TypeOfMapping = {
  undefined: undefined;
  object: object;
  boolean: boolean;
  number: number;
  bigint: bigint;
  string: string;
  symbol: symbol;
  function: Function;
};

export type Builtin = Date | Error | Function | Primitive | RegExp;

export type AnyFunction = (...args: any[]) => any;

export type AnySyncFunction = (...args: any[]) => NotPromise<any>;

export type AnyAsyncFunction = (...args: any[]) => Promise<any>;

export type AnyNewable = {
  new (...args: any[]): any;
};

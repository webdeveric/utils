import type { NumericString, NumericValue, Primitive, StringRecord, TypePredicateFn, UnknownRecord } from './types.js';

export const createIsEnumPredicate = <E extends Record<string, unknown>, T = E>(enumObject: E): TypePredicateFn<T> => {
  const values = Object.values(enumObject);

  return (input: unknown): input is T => {
    return values.includes(input);
  };
};

export const maybeUndefined = <T>(predicate: TypePredicateFn<T>, input: unknown): input is T | undefined => {
  return typeof input === 'undefined' || predicate(input);
};

// Primitives

export const isString = (input: unknown): input is string => typeof input === 'string';

export const isNumber = (input: unknown): input is number => typeof input === 'number' && !Number.isNaN(input);

export const isBigInt = (input: unknown): input is bigint => typeof input === 'bigint';

export const isBoolean = (input: unknown): input is boolean => typeof input === 'boolean';

export const isUndefined = (input: unknown): input is undefined => typeof input === 'undefined';

export const isSymbol = (input: unknown): input is symbol => typeof input === 'symbol';

export const isNull = (input: unknown): input is null => input === null;

export const isPrimitive = (input: unknown): input is Primitive =>
  isString(input) ||
  isNumber(input) ||
  isBigInt(input) ||
  isBoolean(input) ||
  isUndefined(input) ||
  isSymbol(input) ||
  isNull(input);

// Optional primitives

export const isOptionalString = (input: unknown): input is string | undefined => maybeUndefined(isString, input);

export const isOptionalNumber = (input: unknown): input is number | undefined => maybeUndefined(isNumber, input);

export const isOptionalBigInt = (input: unknown): input is bigint | undefined => maybeUndefined(isBigInt, input);

export const isOptionalBoolean = (input: unknown): input is boolean | undefined => maybeUndefined(isBoolean, input);

export const isOptionalSymbol = (input: unknown): input is symbol | undefined => maybeUndefined(isSymbol, input);

export const isOptionalNull = (input: unknown): input is null | undefined => maybeUndefined(isNull, input);

// Primitives with extra checks

export const isStringWithLength = (input: unknown): input is string => typeof input === 'string' && input.length > 0;

export const isStringMatching = (input: unknown, pattern: RegExp): input is string =>
  typeof input === 'string' && pattern.test(input);

export const isNumericString = (input: unknown): input is NumericString =>
  isStringMatching(input, /^[-+]?\d+(\.\d+)?$/);

export const isNumericValue = (input: unknown): input is NumericValue =>
  typeof input === 'number' || typeof input === 'bigint' || isNumericString(input);

export const isNumericValueArray = (input: unknown): input is NumericValue[] =>
  Array.isArray(input) && input.every(isNumericValue);

export const isIntString = (input: unknown): input is NumericString => isStringMatching(input, /^[-+]?\d+$/);

export const isFiniteNumber = (input: unknown): input is number => Number.isFinite(input);

export const isInteger = (input: unknown): input is number => Number.isInteger(input);

export const isPositiveInteger = (input: unknown): input is number => isInteger(input) && input >= 0;

export const isPositiveFiniteNumber = (input: unknown): input is number => isFiniteNumber(input) && input >= 0;

// Common types

export const isPropertyKey = (input: unknown): input is PropertyKey =>
  typeof input === 'string' || typeof input === 'number' || typeof input === 'symbol';

export const isObject = <T extends UnknownRecord = UnknownRecord>(input: unknown): input is T =>
  input !== null && typeof input === 'object' && !Array.isArray(input);

export const isLengthAware = (input: unknown): input is { length: number } =>
  input !== null && typeof input === 'object' && 'length' in input && typeof input.length === 'number';

export const isStringRecord = (input: unknown): input is StringRecord => {
  return isObject(input) && Object.entries(input).every(entry => entry.every(isString));
};

export const isPromiseFulfilledResult = <T>(input: unknown): input is PromiseFulfilledResult<T> => {
  return isObject(input) && input.status === 'fulfilled';
};

export const isPromiseRejectedResult = (input: unknown): input is PromiseRejectedResult => {
  return isObject(input) && input.status === 'rejected' && 'reason' in input;
};

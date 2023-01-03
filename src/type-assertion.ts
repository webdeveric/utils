import { createStringMatchingPredicate } from './type-predicate-factory.js';
import {
  isBigInt,
  isBigIntArray,
  isBoolean,
  isBooleanArray,
  isDigitsString,
  isFiniteNumber,
  isInteger,
  isIntString,
  isLengthAware,
  isNull,
  isNullArray,
  isNumber,
  isNumberArray,
  isNumericString,
  isNumericValue,
  isNumericValueArray,
  isObject,
  isOptionalBigInt,
  isOptionalBoolean,
  isOptionalNull,
  isOptionalNumber,
  isOptionalString,
  isOptionalSymbol,
  isPositiveFiniteNumber,
  isPositiveInteger,
  isPrimitive,
  isPromiseFulfilledResult,
  isPromiseRejectedResult,
  isPropertyKey,
  isSizeAware,
  isString,
  isStringArray,
  isStringRecord,
  isStringWithLength,
  isSymbol,
  isSymbolArray,
  isUndefined,
  isUndefinedArray,
} from './type-predicate.js';

import type { NumericString, NumericValue, Primitive, StringRecord, UnknownRecord } from './types.js';

function getError(error: string | Error): Error {
  return error instanceof Error ? error : new TypeError(error);
}

export function assertIsBigInt(
  input: unknown,
  error: string | Error = 'input is not a bigint',
): asserts input is bigint {
  if (!isBigInt(input)) {
    throw getError(error);
  }
}

export function assertIsBoolean(
  input: unknown,
  error: string | Error = 'input is not a boolean',
): asserts input is boolean {
  if (!isBoolean(input)) {
    throw getError(error);
  }
}

export function assertIsFiniteNumber(
  input: unknown,
  error: string | Error = 'input is not a finite number',
): asserts input is number {
  if (!isFiniteNumber(input)) {
    throw getError(error);
  }
}

export function assertIsInteger(
  input: unknown,
  error: string | Error = 'input is not an integer',
): asserts input is number {
  if (!isInteger(input)) {
    throw getError(error);
  }
}

export function assertIsIntString(
  input: unknown,
  error: string | Error = 'input is not an integer string',
): asserts input is NumericString {
  if (!isIntString(input)) {
    throw getError(error);
  }
}

export function assertIsDigitsString(
  input: unknown,
  error: string | Error = 'input is not a string of integers only',
): asserts input is NumericString {
  if (!isDigitsString(input)) {
    throw getError(error);
  }
}

export function assertIsLengthAware(
  input: unknown,
  error: string | Error = 'input is not length aware',
): asserts input is { length: number } {
  if (!isLengthAware(input)) {
    throw getError(error);
  }
}

export function assertIsSizeAware(
  input: unknown,
  error: string | Error = 'input is not size aware',
): asserts input is { size: number } {
  if (!isSizeAware(input)) {
    throw getError(error);
  }
}

export function assertIsNull(input: unknown, error: string | Error = 'input is not null'): asserts input is null {
  if (!isNull(input)) {
    throw getError(error);
  }
}

export function assertIsNumber(
  input: unknown,
  error: string | Error = 'input is not a number',
): asserts input is number {
  if (!isNumber(input)) {
    throw getError(error);
  }
}

export function assertIsNumericString(
  input: unknown,
  error: string | Error = 'input is not a numeric string',
): asserts input is NumericString {
  if (!isNumericString(input)) {
    throw getError(error);
  }
}

export function assertIsNumericValue(
  input: unknown,
  error: string | Error = 'input is not a numerical value',
): asserts input is NumericValue {
  if (!isNumericValue(input)) {
    throw getError(error);
  }
}

export function assertIsNumericValueArray(
  input: unknown,
  error: string | Error = 'input is not a numerical value array',
): asserts input is NumericValue[] {
  if (!isNumericValueArray(input)) {
    throw getError(error);
  }
}

export function assertIsObject<T extends UnknownRecord = UnknownRecord>(
  input: unknown,
  error: string | Error = 'input is not an object',
): asserts input is T {
  if (!isObject<T>(input)) {
    throw getError(error);
  }
}

export function assertIsOptionalBigInt(
  input: unknown,
  error: string | Error = 'input is not an optional bigint',
): asserts input is bigint | undefined {
  if (!isOptionalBigInt(input)) {
    throw getError(error);
  }
}

export function assertIsOptionalBoolean(
  input: unknown,
  error: string | Error = 'input is not an optional boolean',
): asserts input is boolean | undefined {
  if (!isOptionalBoolean(input)) {
    throw getError(error);
  }
}

export function assertIsOptionalNull(
  input: unknown,
  error: string | Error = 'input is not an optional null',
): asserts input is null | undefined {
  if (!isOptionalNull(input)) {
    throw getError(error);
  }
}

export function assertIsOptionalNumber(
  input: unknown,
  error: string | Error = 'input is not an optional number',
): asserts input is number | undefined {
  if (!isOptionalNumber(input)) {
    throw getError(error);
  }
}

export function assertIsOptionalString(
  input: unknown,
  error: string | Error = 'input is not an optional string',
): asserts input is string | undefined {
  if (!isOptionalString(input)) {
    throw getError(error);
  }
}

export function assertIsOptionalSymbol(
  input: unknown,
  error: string | Error = 'input is not an optional symbol',
): asserts input is symbol | undefined {
  if (!isOptionalSymbol(input)) {
    throw getError(error);
  }
}

export function assertIsStringArray(
  input: unknown,
  error: string | Error = 'input is not an array of X',
): asserts input is string[] {
  if (!isStringArray(input)) {
    throw getError(error);
  }
}

export function assertIsNumberArray(
  input: unknown,
  error: string | Error = 'input is not an array of X',
): asserts input is number[] {
  if (!isNumberArray(input)) {
    throw getError(error);
  }
}

export function assertIsBigIntArray(
  input: unknown,
  error: string | Error = 'input is not an array of X',
): asserts input is bigint[] {
  if (!isBigIntArray(input)) {
    throw getError(error);
  }
}

export function assertIsBooleanArray(
  input: unknown,
  error: string | Error = 'input is not an array of X',
): asserts input is boolean[] {
  if (!isBooleanArray(input)) {
    throw getError(error);
  }
}

export function assertIsUndefinedArray(
  input: unknown,
  error: string | Error = 'input is not an array of X',
): asserts input is undefined[] {
  if (!isUndefinedArray(input)) {
    throw getError(error);
  }
}

export function assertIsSymbolArray(
  input: unknown,
  error: string | Error = 'input is not an array of X',
): asserts input is symbol[] {
  if (!isSymbolArray(input)) {
    throw getError(error);
  }
}

export function assertIsNullArray(
  input: unknown,
  error: string | Error = 'input is not an array of X',
): asserts input is null[] {
  if (!isNullArray(input)) {
    throw getError(error);
  }
}

export function assertIsPositiveFiniteNumber(
  input: unknown,
  error: string | Error = 'input is not a positive finite number',
): asserts input is number {
  if (!isPositiveFiniteNumber(input)) {
    throw getError(error);
  }
}

export function assertIsNumberGTEOne(
  input: unknown,
  error: string | Error = 'input is not a number >= 1',
): asserts input is number {
  if (!isPositiveFiniteNumber(input) || input < 1) {
    throw getError(error);
  }
}

export function assertIsPositiveInteger(
  input: unknown,
  error: string | Error = 'input is not a positive integer',
): asserts input is number {
  if (!isPositiveInteger(input)) {
    throw getError(error);
  }
}

export function assertIsPrimitive(
  input: unknown,
  error: string | Error = 'input is not primitive',
): asserts input is Primitive {
  if (!isPrimitive(input)) {
    throw getError(error);
  }
}

export function assertIsPromiseFulfilledResult<T>(
  input: unknown,
  error: string | Error = 'input is not a promise fulfilled result',
): asserts input is PromiseFulfilledResult<T> {
  if (!isPromiseFulfilledResult(input)) {
    throw getError(error);
  }
}

export function assertIsPromiseRejectedResult(
  input: unknown,
  error: string | Error = 'input is not a promise rejected result',
): asserts input is PromiseRejectedResult {
  if (!isPromiseRejectedResult(input)) {
    throw getError(error);
  }
}

export function assertIsPropertyKey(
  input: unknown,
  error: string | Error = 'input is not a property key',
): asserts input is PropertyKey {
  if (!isPropertyKey(input)) {
    throw getError(error);
  }
}

export function assertIsString(
  input: unknown,
  error: string | Error = 'input is not a string',
): asserts input is string {
  if (!isString(input)) {
    throw getError(error);
  }
}

export function assertIsStringMatching(
  input: unknown,
  pattern: RegExp,
  error: string | Error = 'input is not a string that matches the pattern',
): asserts input is string {
  if (!createStringMatchingPredicate(pattern)(input)) {
    throw getError(error);
  }
}

export function assertIsStringRecord(
  input: unknown,
  error: string | Error = 'input is not a string record',
): asserts input is StringRecord {
  if (!isStringRecord(input)) {
    throw getError(error);
  }
}

export function assertIsStringWithLength(
  input: unknown,
  error: string | Error = 'input is not a string with length',
): asserts input is string {
  if (!isStringWithLength(input)) {
    throw getError(error);
  }
}

export function assertIsSymbol(
  input: unknown,
  error: string | Error = 'input is not a symbol',
): asserts input is symbol {
  if (!isSymbol(input)) {
    throw getError(error);
  }
}

export function assertIsUndefined(
  input: unknown,
  error: string | Error = 'input is not undefined',
): asserts input is undefined {
  if (!isUndefined(input)) {
    throw getError(error);
  }
}

export function assertExhaustive(_: never, error: string | Error = 'Failed exhaustive check'): never {
  throw getError(error);
}

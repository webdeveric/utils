import type { NumericString, NumericValue } from './types';

export const isOptionalString = (input: unknown): input is string | undefined =>
  typeof input === 'string' || typeof input === 'undefined';

export const isOptionalNumber = (input: unknown): input is number | undefined =>
  (typeof input === 'number' && ! Number.isNaN(input)) || typeof input === 'undefined';

export const isStringMatching = (input: unknown, pattern: RegExp): input is string =>
  typeof input === 'string' && pattern.test(input);

export const isPropertyKey = (input: unknown): input is PropertyKey =>
  typeof input === 'string' || typeof input === 'number' || typeof input === 'symbol';

export const isNumericString = (input: unknown): input is NumericString =>
  isStringMatching(input, /^[-+]?\d+(\.\d+)?$/);

export const isNumericValue = (input: unknown): input is NumericValue =>
  typeof input === 'number' || typeof input === 'bigint' || isNumericString(input);

export const isNumericValueArray = (input: unknown): input is NumericValue[] =>
  Array.isArray(input) && input.every(isNumericValue);

export const isIntString = (input: unknown): input is NumericString => isStringMatching(input, /^[-+]?\d+$/);

export const isFiniteNumber = (input: unknown): input is number => typeof input === 'number' && Number.isFinite(input);

export const isInteger = (input: unknown): input is number => Number.isInteger(input);

export const isPositiveInteger = (input: unknown): input is number => isInteger(input) && input >= 0;

export const isPositiveFiniteNumber = (input: unknown): input is number => isFiniteNumber(input) && input >= 0;
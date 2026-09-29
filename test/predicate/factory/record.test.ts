import { describe, it, expect, vi } from 'vitest';

import { literal } from '../../../src/predicate/factory/literal.js';
import { record } from '../../../src/predicate/factory/record.js';
import { isNumber } from '../../../src/predicate/isNumber.js';
import { isString } from '../../../src/predicate/isString.js';
import { isSymbol } from '../../../src/predicate/isSymbol.js';

describe('record()', () => {
  it('Returns a type predicate function', () => {
    expect(record(isString, isNumber)).toBeInstanceOf(Function);
  });

  it('Returns true when all keys and values pass', () => {
    const fn = record(isString, isNumber);

    expect(fn({})).toBeTruthy();
    expect(fn({ a: 1, b: 2 })).toBeTruthy();
    expect(fn(Object.create(null))).toBeTruthy();
  });

  it('Returns false when a value fails', () => {
    const fn = record(isString, isNumber);

    expect(fn({ a: 1, b: 'test' })).toBeFalsy();
  });

  it('Returns false when a key fails', () => {
    const fn = record(isString, isNumber);

    expect(fn({ a: 1, [Symbol('test')]: 2 })).toBeFalsy();
    expect(record(isSymbol, isNumber)({ [Symbol('test')]: 1 })).toBeTruthy();
    expect(record(literal('a'), isNumber)({ a: 1, b: 2 })).toBeFalsy();
  });

  it('Treats numeric keys as strings', () => {
    expect(record(isString, isNumber)({ 1: 1 })).toBeTruthy();
    // @ts-expect-error: number keys are not supported since object keys are strings or symbols.
    expect(record(isNumber, isNumber)({ 1: 1 })).toBeFalsy();
  });

  it('Checks non-enumerable own keys', () => {
    const input = Object.defineProperty({ a: 1 }, 'hidden', { value: 'test', enumerable: false });

    expect(record(isString, isNumber)(input)).toBeFalsy();
  });

  it('Ignores inherited keys', () => {
    const input = Object.create({ inherited: 'test' });

    input.a = 1;

    expect(record(isString, isNumber)(input)).toBeTruthy();
  });

  it('Returns false for non-objects', () => {
    const fn = record(isString, isNumber);

    expect(fn(null)).toBeFalsy();
    expect(fn(undefined)).toBeFalsy();
    expect(fn([1, 2, 3])).toBeFalsy();
    expect(fn('test')).toBeFalsy();
    expect(fn(123)).toBeFalsy();
    expect(fn(() => 1)).toBeFalsy();
  });

  it('Stops checking after the first failure', () => {
    const keyPredicate = vi.fn(isString) as unknown as typeof isString;
    const valuePredicate = vi.fn(isNumber) as unknown as typeof isNumber;

    const fn = record(keyPredicate, valuePredicate);

    expect(fn({ a: 'fail', b: 2, c: 3 })).toBeFalsy();
    expect(keyPredicate).toHaveBeenCalledTimes(1);
    expect(valuePredicate).toHaveBeenCalledTimes(1);
  });
});

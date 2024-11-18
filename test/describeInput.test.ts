import { describe, it, expect } from 'vitest';

import { describeInput } from '../src/describeInput.js';

describe('describeInput()', () => {
  it('Returns a string describing the input', () => {
    expect(describeInput(true)).toBe('true');
    expect(describeInput(false)).toBe('false');
    expect(describeInput({})).toBe('Object');
    expect(describeInput([])).toBe('Array');
    expect(describeInput(new Set())).toBe('Set');
    expect(describeInput(() => {})).toBe('anonymous()');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expect(describeInput(function namedFunction(_name: unknown) {})).toBe('namedFunction(_name)');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expect(describeInput(function (_name: unknown) {})).toBe('anonymous(_name)');
    expect(describeInput(Infinity)).toBe('Positive Infinity');
    expect(describeInput(Number.POSITIVE_INFINITY)).toBe('Positive Infinity');
    expect(describeInput(-Infinity)).toBe('Negative Infinity');
    expect(describeInput(Number.NEGATIVE_INFINITY)).toBe('Negative Infinity');
    expect(describeInput(-1)).toBe('Safe Integer');
    expect(describeInput(2 ** 52)).toBe('Safe Integer');
    expect(describeInput(2 ** 53)).toBe('Integer');
    expect(describeInput(1.2)).toBe('Finite Number');
    expect(describeInput(Number.NaN)).toBe('NaN');
    expect(describeInput('123')).toBe('Numeric String');
    expect(describeInput('Basic TOKEN')).toBe('Basic Authorization');
    expect(describeInput('Bearer TOKEN')).toBe('Bearer Authorization');
    expect(describeInput('ftp://example.com/')).toContain('URL');
    expect(describeInput('https://user:pass@example.com/')).toContain('credentials');
    expect(describeInput('https:///')).toBe('Invalid URL');
    expect(describeInput('Test')).toBe('String');
    expect(describeInput(Symbol())).toBe('Symbol()');
    expect(describeInput(Symbol('test'))).toBe('Symbol(test)');
  });
});

import { describe, it, expect } from 'vitest';

import { describeInput } from '../src/describeInput.js';

describe('describeInput()', () => {
  it('Returns a string describing the input', () => {
    expect(describeInput({})).toBe('Object');
    expect(describeInput(Infinity)).toBe('Infinity');
    expect(describeInput(-Infinity)).toBe('Negative Infinity');
    expect(describeInput(1)).toBe('Integer');
    expect(describeInput(1.2)).toBe('Number');
    expect(describeInput(Number.NaN)).toBe('NaN');
    expect(describeInput('123')).toBe('Numeric String');
    expect(describeInput('Basic TOKEN')).toBe('Basic');
    expect(describeInput('Bearer TOKEN')).toBe('Bearer');
    expect(describeInput('ftp://example.com/')).toContain('URL');
    expect(describeInput('https://user:pass@example.com/')).toContain('credentials');
    expect(describeInput('https:///')).toBe('Invalid URL');
    expect(describeInput('Test')).toBe('String');
  });
});

import { describe, it, expect } from 'vitest';

import { capitalize } from '../src/capitalize.js';

describe('capitalize()', () => {
  it('Empty input returns an empty string', () => {
    expect(capitalize('')).toEqual('');
  });

  it('Trims whitespace at start of lines', () => {
    expect(capitalize('word')).toEqual('Word');
  });

  it('Has a type parameter', () => {
    type Name = `name:${string}`;

    const name: Name = 'name:Test Testerson';

    const capitalized = capitalize(name);

    expect(capitalized).toEqual('Name:Test Testerson');
  });
});

import { describe, it, expect } from 'vitest';

import { suffix } from '../src/suffix.js';

describe('suffix()', () => {
  it('Returns a string with the provided suffix', () => {
    expect(suffix('!', 'hi')).toEqual('hi!');
    expect(suffix('!', 123)).toEqual('123!');
  });

  it('Returns the default value with value is empty', () => {
    expect(suffix(':', null, 'default')).toEqual('default');
    expect(suffix(':', void 0, 'default')).toEqual('default');
    expect(suffix(':', '', 'default')).toEqual('default');
  });
});

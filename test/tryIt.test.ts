import { describe, it, expect } from 'vitest';

import { tryIt } from '../src/tryIt.js';

describe('tryIt()', () => {
  it('Invokes a function in a try/catch', () => {
    expect(tryIt(() => true)).toBeTruthy();
  });

  it('Can customize the default value', () => {
    expect(
      tryIt(() => {
        throw new Error();
      }, 'default value'),
    ).toEqual('default value');
  });
});

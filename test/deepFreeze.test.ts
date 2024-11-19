import { describe, it, expect } from 'vitest';

import { deepFreeze } from '../src/deepFreeze.js';

describe('deepFreeze()', () => {
  it('deep freezes an object', () => {
    const data = deepFreeze({
      name: 'Test Testerson',
      job: {
        title: 'Fake User',
      },
    });

    expect(Object.isFrozen(data)).toBeTruthy();
    expect(Object.isFrozen(data.job)).toBeTruthy();
    expect(Object.isFrozen(data.job.title)).toBeTruthy();
  });

  it('deep freezes an array', () => {
    const data = deepFreeze([
      {
        name: 'Name',
      },
    ]);

    expect(Object.isFrozen(data)).toBeTruthy();
    expect(data.every((item) => Object.isFrozen(item))).toBeTruthy();
  });

  it('does not freeze globalThis', () => {
    const data = deepFreeze(globalThis);

    expect(Object.isFrozen(data)).toBeFalsy();
  });
});

import { describe, it, expect } from 'vitest';

import { assertPathExists } from '../src/assertion/assertPathExists.js';
import { isString } from '../src/predicate/isString.js';
import { set } from '../src/set.js';

describe('set()', () => {
  it('updates a value in an object', () => {
    const input = {
      age: 100_000,
      name: {
        first: 'Test',
        last: 'Testerson',
      },
      sayHi(): void {
        console.log('Hi!');
      },
      role: [
        {
          job: {
            title: 'Developer',
          },
        },
      ],
    };

    const lastName = set(input, 'name.last', 'Test');

    const startDate = set(input, 'role.0.job.startDate', new Date().toISOString());

    expect(lastName).toBe(input.name.last);

    assertPathExists(input, 'role.0.job.startDate', isString);

    expect(startDate).toBe(input.role[0].job.startDate);
  });

  it('throws an error when trying to set a value on a non-existent path', () => {
    const input = {
      job: {
        title: 'Developer',
      },
    };

    expect(() => set(input, 'job.details.startDate', 'some date')).toThrowError(
      'Path "job.details" does not exist in the input object',
    );
  });

  it('throws an error when path is empty', () => {
    expect(() => set({}, '', true)).toThrowError('Path cannot be an empty string');
  });

  it('throws an error when path is invalid', () => {
    expect(() => set({}, '...', true)).toThrowError('Path must have at least one part');
  });

  it.each(['name.__proto__', 'name.constructor', 'name.prototype'])(
    'does not allow polluting the prototype chain: "%s"',
    (path) => {
      expect(() => set({ name: 'test' }, path, true)).toThrowError('Cannot pollute prototype');
    },
  );
});

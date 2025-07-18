import { describe, it, expect } from 'vitest';

import { get } from '../src/get.js';

describe('get()', () => {
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

  it('returns a value from an object', () => {
    const lastName = get(input, 'name.last');
    const jobTitle = get(input, 'role.0.job.title');

    expect(lastName).toBe(input.name.last);
    expect(jobTitle).toBe(input.role[0]?.job.title);
  });

  it('Returns undefined when path is invalid', () => {
    const result = get(input, 'role.0.job.nonExistent');

    expect(result).toBeUndefined();
  });

  it('Handles built in objects', () => {
    const date = new Date();

    const result = get(date, 'toString');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(result).toBe(date.toString);
  });

  it('Empty path returns input', () => {
    const date = new Date();

    const result = get(date, '');

    expect(result).toBe(date);
  });
});

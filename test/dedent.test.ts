import { describe, it, expect } from 'vitest';

import { dedent } from '../src/dedent.js';

describe('dedent()', () => {
  it('Trims indentation from a string', () => {
    const description = 'line 2\nline 3';

    const now = Date.now();

    const obj = {
      toString(): string {
        return 'test';
      },
    };

    const output = dedent`
      line 1
        ${description}
      now: ${now}
      obj: ${obj}
    `;

    expect(output).toBe(`line 1\n  line 2\n  line 3\nnow: ${now}\nobj: test`);
  });

  it('Does not trim if no indentation is found', () => {
    const now = Date.now();

    const output = dedent`The time is ${now}`;

    expect(output).toBe(`The time is ${now}`);
  });
});

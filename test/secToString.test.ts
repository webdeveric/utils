import { describe, it, expect } from 'vitest';

import { Seconds, secToString } from '../src/secToString.js';

describe('secToString()', () => {
  it('Returns string representation of the number of seconds', async () => {
    expect(secToString(Seconds.Second)).toBe('1 second');
    expect(secToString(Seconds.Second * 2)).toBe('2 seconds');
    expect(secToString(Seconds.Day)).toBe('1 day');
    expect(secToString(Seconds.Day + Seconds.Second * 2)).toBe('1 day 2 seconds');
  });

  it('Can provide string to join the parts', async () => {
    expect(secToString(Seconds.Week + Seconds.Decade + Seconds.Hour, ', ')).toBe('1 decade, 1 week, 1 hour');
  });
});

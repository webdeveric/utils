import secToString from '../src/secToString';

describe('secToString()', () => {
  it('Returns string representation of the number of seconds', async () => {
    expect( secToString(1) ).toBe('1 second');
    expect( secToString(2) ).toBe('2 seconds');
    expect( secToString(86400) ).toBe('1 day');
    expect( secToString(86402) ).toBe('1 day 2 seconds');
  });
});

import { getMaxValue } from '../src/getMaxValue';

describe('getMaxValue()', () => {
  it('Returns the minimum value', () => {
    expect(getMaxValue(1, 2, 3)).toBe(3);
  });

  it('Values can be mixed numeric types', () => {
    expect(getMaxValue(1, 2n, '3.14')).toBe('3.14');
  });

  it('Throws when not given correct input', () => {
    expect(() => {
      getMaxValue();
    }).toThrow();
  });
});

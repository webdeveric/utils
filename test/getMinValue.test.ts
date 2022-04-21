import { getMinValue } from '../src/getMinValue';

describe('getMinValue()', () => {
  it('Returns the minimum value', () => {
    expect(getMinValue(3, 2, 1)).toBe(1);
  });

  it('Values can be mixed numeric types', () => {
    expect(getMinValue(100, 20n, '3.14')).toBe('3.14');
  });

  it('Throws when not given correct input', () => {
    expect(() => {
      getMinValue(null as unknown as Parameters<typeof getMinValue>[number]);
    }).toThrow();

    expect(() => {
      getMinValue(...[] as unknown as Parameters<typeof getMinValue>);
    }).toThrow();
  });
});

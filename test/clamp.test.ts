import { clamp } from '../src/clamp';

describe('clamp()', () => {
  it('Clamps a value between an upper and lower bound', () => {
    expect(clamp(0, 10, 100)).toBe(10);
    expect(clamp(0, -10, 100)).toBe(0);
    expect(clamp(0, 1000, 100)).toBe(100);
    expect(clamp(0n, '10', 100)).toBe('10');
  });
});
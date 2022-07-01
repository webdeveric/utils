import { trimIndentation } from '../src/trimIndentation';

describe('trimIndentation()', () => {
  it('Trims indentation from a string', () => {
    expect(
      trimIndentation(
        `
          test
          test
        `,
      ),
    ).toBe('test\ntest');
  });

  it('Returns input when no indentation detected', () => {
    expect(trimIndentation('test')).toBe('test');
  });
});
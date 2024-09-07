import { describe, it, expect } from 'vitest';

import { resultify, resultifyAsync } from '../src/resultify.js';

describe('resultify()', () => {
  it('Returns a function that returns a Result', () => {
    expect(resultify(() => true)).toBeTypeOf('function');
  });

  it('Result can have ok property', () => {
    expect(resultify(() => true)()).toEqual({
      ok: true,
    });
  });

  it('Result can have error property', () => {
    expect(
      resultify(() => {
        throw new Error('test');
      })(),
    ).toEqual(
      expect.objectContaining({
        error: expect.any(Error),
      }),
    );
  });
});

describe('resultifyAsync()', () => {
  it('Returns a function that returns a Promise<Result>', () => {
    expect(resultifyAsync(async () => true)).toBeTypeOf('function');
  });

  it('Result can have ok property', async () => {
    await expect(resultifyAsync(async () => true)()).resolves.toEqual({
      ok: true,
    });
  });

  it('Result can have error property', async () => {
    await expect(
      resultifyAsync(async () => {
        throw new Error('test');
      })(),
    ).resolves.toEqual(
      expect.objectContaining({
        error: expect.any(Error),
      }),
    );
  });
});

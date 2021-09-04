import { delay } from '../src/delay';

describe('delay()', () => {
  beforeEach( () => {
    jest.useFakeTimers();
  });

  it('Delays by some number of milliseconds', async () => {
    const tenSecondDelay = delay(10_000);

    jest.runOnlyPendingTimers();

    await expect( tenSecondDelay ).resolves.toBeUndefined();
  });

  it('Specifies the return value', async () => {
    const tenSecondDelay = delay(10_000, 'value');

    jest.runOnlyPendingTimers();

    await expect( tenSecondDelay ).resolves.toBe('value');
  });

  it('Rejects when provided invalid milliseconds', async () => {
    await expect( delay('wrong milliseconds value') ).rejects.toThrow();
  });
});

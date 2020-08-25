import { delay } from '../src/delay';

describe('delay()', () => {
  beforeEach( () => {
    jest.useFakeTimers();
  });

  it('Delays by some number of milliseconds', async () => {
    const tenSecondDelay = delay(10000);

    jest.runOnlyPendingTimers();

    await expect( tenSecondDelay ).resolves.toBeUndefined();
  });

  it('Specifies the return value', async () => {
    const tenSecondDelay = delay(10000, 'value');

    jest.runOnlyPendingTimers();

    await expect( tenSecondDelay ).resolves.toBe('value');
  });

  it('Throws when provided invalid ms', () => {
    expect( () => {
      delay('wrong ms value');
    }).toThrow();
  });
});

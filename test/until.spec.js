import { until } from '../src/until';

describe('until()', () => {
  it('Waits until the callback resolves or rejects', async () => {
    const untilTrue = until( resolve => resolve(true) );

    await expect( untilTrue ).resolves.toBeTruthy();
  });

  it('delay can be a callback that accepts a context', async () => {
    const mockDelay = jest.fn( context => context.callCount );
    const callLimit = 2;

    const untilTrue = until(
      (resolve, reject, context) => {
        if ( context.callCount >= callLimit ) {
          resolve(true);
        }
      },
      mockDelay,
    );

    await expect( untilTrue ).resolves.toBeTruthy();

    expect( mockDelay.mock.calls.length ).toBe( callLimit );
  });

  it('Callback checks an external variable', async () => {
    let doSomething = false;

    setTimeout( () => {
      doSomething = true;
    }, 3 );

    await expect( until( resolve => {
      if ( doSomething ) {
        resolve( true );
      }
    }, 1, 10 ) ).resolves.toBeTruthy();
  });

  it('Waits for some time to pass', async () => {
    function msFromNow(ms) {
      const start = Date.now();

      return () => Date.now() - start >= ms;
    }

    const someTimeHasPassed = msFromNow( 5 );

    const callback = resolve => {
      if ( someTimeHasPassed() ) {
        resolve(2);
      }
    };

    await expect( until( callback, 1 ) ).resolves.toBe(2);
  });

  it('Can timeout', async () => {
    await expect( until( () => {}, 1, 1 ) ).rejects.toBeInstanceOf(Error);
  });

  describe('Invalid arguments throw an error', () => {
    const cb = resolve => resolve(true);

    it('fn must be a function', () => {
      expect(() => {
        until('not a function');
      }).toThrow();
    });

    it('delay must be a function or a number', () => {
      expect( () => {
        until( cb, 1 );
        until( cb, () => 1 );
      }).not.toThrow();

      expect( () => {
        until( cb, false );
      }).toThrow();

      expect( () => {
        until( cb, 'not a number' );
      }).toThrow();
    });

    it('timeout must be undefined, function, or number', () => {
      expect( () => {
        until( cb, 1, undefined );
        until( cb, 1, 10 );
        until( cb, 1, () => 10 );
      }).not.toThrow();

      expect( () => {
        until( cb, 1, null );
      }).toThrow();

      expect( () => {
        until( cb, 1, false );
      }).toThrow();

      expect( () => {
        until( cb, 1, 'not a number' );
      }).toThrow();
    });
  });

  it('fn that throws will cause a rejection', async () => {
    await expect( until( () => {
      throw new Error('rejected');
    }, 1, 1 ) ).rejects.toBeInstanceOf(Error);
  });
});

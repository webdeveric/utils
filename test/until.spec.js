import { until } from '../src/until';

describe('until()', () => {
  it('Waits until the callback resolves or rejects', async () => {
    const untilTrue = until( resolve => resolve(true) );

    await expect( untilTrue ).resolves.toBeTruthy();
  });

  it('delay can be a callback that accepts a context', async () => {
    const mockFn = jest.fn( context => context.callCount );
    const callLimit = 2;

    const untilTrue = until(
      (resolve, reject, context) => {
        if ( context.callCount === callLimit ) {
          resolve(true);
        }
      },
      mockFn,
    );

    await expect( untilTrue ).resolves.toBeTruthy();

    expect( mockFn.mock.calls[ 0 ] ).toHaveLength(1);

    expect( mockFn ).toHaveBeenCalledTimes( callLimit - 1 );
  });

  it('timeout can be a callback that accepts a context', async () => {
    const mockFn = jest.fn( context => context.callCount );

    const willTimeout = until( () => {}, 1000, mockFn );

    await expect( willTimeout ).rejects.toBeInstanceOf(Error);

    expect( mockFn.mock.calls[ 0 ] ).toHaveLength(1);

    expect( mockFn ).toHaveBeenCalledTimes( 1 );
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

  it('fn that throws will cause a rejection', async () => {
    await expect( until( () => {
      throw new Error('rejected');
    }, 1, 1 ) ).rejects.toBeInstanceOf(Error);
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

  describe('context', () => {
    it('Keeps track of how many times the callback was called', async () => {
      const context = await until( (resolve, reject, context) => {
        if ( context.callCount === 2 ) {
          resolve(context);
        }
      }, 0, 10 );

      expect( context.callCount ).toBe(2);
    });

    it('Keeps track of the last time the callback was called', async () => {
      const context = await until( (resolve, reject, context) => {
        resolve(context);
      }, 0, 10 );

      expect( typeof context.lastCall ).toBe('number');
    });

    it('Keeps track of arbitrary data', async () => {
      const context = await until( (resolve, reject, context) => {
        context.data.demo = true;
        resolve(context);
      }, 0, 10 );

      expect( context.data.demo ).toBeTruthy();
    });
  })
});

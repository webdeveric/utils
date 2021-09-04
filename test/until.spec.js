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
      {
        delay: mockFn,
      }
    );

    await expect( untilTrue ).resolves.toBeTruthy();

    expect( mockFn.mock.calls[ 0 ] ).toHaveLength(1);

    expect( mockFn ).toHaveBeenCalledTimes( callLimit - 1 );
  });

  it('timeout can be a callback that accepts a context', async () => {
    const mockFn = jest.fn( context => context.callCount );

    const willTimeout = until( () => {}, { timeout: mockFn } );

    await expect( willTimeout ).rejects.toBeInstanceOf(Error);

    expect( mockFn.mock.calls[ 0 ] ).toHaveLength(1);

    expect( mockFn ).toHaveBeenCalledTimes( 1 );
  });

  it('Callback checks an external variable', async () => {
    let doSomething = false;

    setTimeout( () => {
      doSomething = true;
    }, { delay: 3 } );

    await expect( until( resolve => {
      if ( doSomething ) {
        resolve( true );
      }
    },  { delay: 1, timeout: 10 } ) ).resolves.toBeTruthy();
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

    await expect( until( callback, { delay: 1 } ) ).resolves.toBe(2);
  });

  it('Can timeout', async () => {
    await expect( until( () => {}, { delay: 1, timeout: 1 } ) ).rejects.toBeInstanceOf(Error);
  });

  it('fn that throws will cause a rejection', async () => {
    await expect( until( () => {
      throw new Error('rejected');
    }, { delay: 1, timeout: 1 } ) ).rejects.toBeInstanceOf(Error);

    await expect( until( () => {
      throw 'error';
    }, { delay: 1, timeout: 1 } ) ).rejects.toBeInstanceOf(Error);
  });

  it('Will reject after options.callLimit is reached', async () => {
    const options = {
      delay: 1,
      callLimit: 3,
    };

    const results = until( () => {}, options );

    await expect( results ).rejects.toBeInstanceOf(Error);
  });

  describe('Invalid arguments throw an error', () => {
    const cb = resolve => resolve(true);

    it('fn must be a function', () => {
      expect(() => {
        until('not a function');
      }).toThrow();
    });

    describe('options', () => {
      it('options must be an object or undefined', () => {
        expect( () => {
          until( cb );
          until( cb, { delay: 1 } );
        }).not.toThrow();

        expect( () => {
          until( cb, null );
        }).toThrow();

        expect( () => {
          until( cb, false );
        }).toThrow();
      });

      it('options.delay must be a function or a number', () => {
        expect( () => {
          until( cb, { delay: 1 } );
          until( cb, { delay: () => 1} );
        }).not.toThrow();

        expect( () => {
          until( cb, { delay: false } );
        }).toThrow();

        expect( () => {
          until( cb, { delay: 'not a number' } );
        }).toThrow();
      });

      it('options.timeout must be undefined, function, or number', () => {
        expect( () => {
          until( cb, { delay: 1, timeout: undefined } );
          until( cb, { delay: 1, timeout: 10 } );
          until( cb, { delay: 1, timeout: () => 10 } );
        }).not.toThrow();

        expect( () => {
          until( cb, { delay: 1, timeout: null } );
        }).toThrow();

        expect( () => {
          until( cb, { delay: 1, timeout: false } );
        }).toThrow();

        expect( () => {
          until( cb, { delay: 1, timeout: 'not a number' } );
        }).toThrow();
      });

      it('options.callLimit must be undefined or number', () => {
        expect( () => {
          until( cb, { callLimit: undefined } );
          until( cb, { callLimit: 2 } );
        }).not.toThrow();

        expect( () => {
          until( cb, { callLimit: 'test' } );
        }).toThrow();
      });
    });
  });

  describe('context', () => {
    it('Keeps track of how many times the callback was called', async () => {
      const context = await until( (resolve, reject, context) => {
        if ( context.callCount === 2 ) {
          resolve(context);
        }
      }, { delay: 0, timeout: 10 } );

      expect( context.callCount ).toBe(2);
    });

    it('Keeps track of the last time the callback was called', async () => {
      const context = await until( (resolve, reject, context) => {
        resolve(context);
      }, { delay: 0, timeout: 10 } );

      expect( typeof context.lastCall ).toBe('number');
    });

    it('Keeps track of arbitrary data', async () => {
      const context = await until( (resolve, reject, context) => {
        context.data.demo = true;
        resolve(context);
      }, { delay: 0, timeout: 10 } );

      expect( context.data.demo ).toBeTruthy();
    });

    it('Keeps track of options', async () => {
      const options = {
        delay: 0,
        timeout: 10,
      };

      const contextOptions = await until( (resolve, reject, context) => {
        resolve(context.options);
      }, options );

      expect( contextOptions ).toBe( options );
    });
  })
});

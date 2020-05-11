import { until } from '../src/until';

describe('until()', () => {
  it('Waits until the callback is truthy', async () => {
    const mock = jest.fn( () => true );

    const untilTrue = until( mock );

    await expect( untilTrue ).resolves.toBeTruthy();
  });

  it('Callback checks an external variable', async () => {
    let doSomething = false;

    setTimeout( () => {
      doSomething = true;
    }, 3 );

    await expect( until( ({ resolve }) => {
      if ( doSomething ) {
        resolve( true );
      }
    }, 1 ) ).resolves.toBeTruthy();
  });

  it('Waits for some time to pass', async () => {
    function msFromNow(ms) {
      const start = Date.now();

      return () => Date.now() - start >= ms;
    }

    const someTimeHasPassed = msFromNow( 5 );

    const callback = controller => {
      if ( someTimeHasPassed() ) {
        controller.resolve(2);
      }
    };

    await expect( until( callback, 1 ) ).resolves.toBe(2);
  });

  it('Can timeout', async () => {
    await expect( until( () => {}, 1, 1 ) ).rejects.toBeInstanceOf(Error);
  });

  describe('Invalid arguments throw an error', () => {
    it('fn must be a function', () => {
      expect(() => {
        until('not a function');
      }).toThrow();
    });

    it('delay must be a function or a number', () => {
      expect( () => {
        until( () => true, 1 );
        until( () => true, () => 1 );
      }).not.toThrow();

      expect( () => {
        until( () => true, false );
        until( () => true, 'not a number' );
      }).toThrow();
    });

    it('timeout must be null, function, or number', () => {
      expect( () => {
        until( () => true, 1, null );
        until( () => true, 1, undefined );
        until( () => true, 1, 10 );
        until( () => true, 1, () => 10 );
      }).not.toThrow();

      expect( () => {
        until( () => true, 1, false );
        until( () => true, 1, 'not a number' );
      }).toThrow();
    });
  });

  it('fn that throws will cause a rejection', async () => {
    await expect( until( () => {
      throw new Error('rejected');
    }, 1, 1 ) ).rejects.toBeInstanceOf(Error);
  });
});

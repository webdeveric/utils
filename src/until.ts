type Context = {
  callCount: number;
  lastCall?: number;
};

type DelayFn = (context?: Context) => number;

type Delay = DelayFn | number;

type ResolveFn<T> = (value?: T) => void;

type RejectFn = (error?: Error) => void;

type UntilCallback<T> = (resolve: ResolveFn<T>, reject: RejectFn, context: Context) => void;

function looksLikeDelay( delay: unknown ) : delay is Delay
{
  return Number.isInteger( delay ) || typeof delay === 'function';
}

function getDelay( delay: Delay, context?: Context ) : number
{
  return typeof delay === 'function' ? delay( context ) : delay;
}

/**
 * Return a Promise that delegates resolving/rejecting to the passed in function.
 */
export function until<T>( fn: UntilCallback<T>, delay: Delay = 10, timeout?: number ) : Promise<T>
{
  if ( typeof fn !== 'function' ) {
    throw new Error('fn must be a function');
  }

  if ( ! looksLikeDelay( delay ) ) {
    throw new Error('invalid delay value');
  }

  if ( timeout !== undefined && ! looksLikeDelay( timeout ) ) {
    throw new Error('invalid timeout value');
  }

  return new Promise<T>( ( resolutionFn: ResolveFn<T>, rejectionFn: RejectFn ) => {
    let callCount = 0;
    let lastCall: number | undefined;
    let done = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timeoutTimer: any;

    const finish = () : void => {
      done = true;
      clearTimeout( timer );
      clearTimeout( timeoutTimer );
    };

    const resolve: ResolveFn<T> = (value?: T) : void => {
      resolutionFn( value );
      finish();
    };

    const reject: RejectFn = (error?: Error) : void => {
      rejectionFn( error );
      finish();
    };

    const callUntilDone = ( fn: UntilCallback<T>, delay: Delay, resolve: ResolveFn<T>, reject: RejectFn ) : void => {
      try {
        const context: Context = Object.freeze({ callCount, lastCall });

        fn( resolve, reject, context );

        ++callCount;
        lastCall = Date.now();

        if ( ! done ) {
          timer = setTimeout( callUntilDone, getDelay( delay, context ), fn, delay, resolve, reject );
        }
      } catch ( error ) {
        reject( error );
      }
    };

    callUntilDone( fn, delay, resolve, reject );

    if ( ! done && timeout !== undefined ) {
      timeoutTimer = setTimeout(
        () => {
          reject( new Error('until: timed out') );
        },
        getDelay( timeout ),
      );
    }
  });
}

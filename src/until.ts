type Context = {
  callCount: number;
  lastCall?: number;
  data?: Record<string, unknown>;
};

type DelayFn = (context?: Readonly<Context>) => number;

type Delay = DelayFn | number;

type ResolverValue<T> = T | PromiseLike<T>;

type ResolveFn<T> = (value: ResolverValue<T>) => void;

type RejectFn = (error?: Error) => void;

type UntilCallback<T> = (resolve: ResolveFn<T>, reject: RejectFn, context: Readonly<Context>) => void;

function looksLikeDelay( delay: unknown ) : delay is Delay
{
  return Number.isInteger( delay ) || typeof delay === 'function';
}

function getDelay( delay: Delay, context: Context ) : number
{
  return typeof delay === 'function' ? delay( context ) : delay;
}

/**
 * Return a Promise that delegates resolving/rejecting to the passed in function.
 */
export function until<T>( fn: UntilCallback<T>, delay: Delay = 10, timeout?: Delay ) : Promise<T>
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

    const resolve: ResolveFn<T> = (value: ResolverValue<T>) : void => {
      resolutionFn( value );
      finish();
    };

    const reject: RejectFn = (error?: Error) : void => {
      rejectionFn( error );
      finish();
    };

    const context: Readonly<Context> = Object.freeze({
      get callCount() {
        return callCount;
      },
      get lastCall() {
        return lastCall;
      },
      data: {},
    });

    const callUntilDone = ( fn: UntilCallback<T>, delay: Delay, resolve: ResolveFn<T>, reject: RejectFn ) : void => {
      try {
        ++callCount;

        fn( resolve, reject, context );

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
        getDelay( timeout, context ),
      );
    }
  });
}

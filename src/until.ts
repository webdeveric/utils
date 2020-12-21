export interface UntilContext {
  callCount: number;
  lastCall?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

type DelayFn = (context: Readonly<UntilContext>) => number;

type Delay = DelayFn | number;

type Options = {
  delay: Delay;
  timeout?: Delay;
  callLimit?: number;
};

export interface UntilContext {
  options: Options;
}

type ResolverValue<T> = T | PromiseLike<T>;

type ResolveFn<T> = (value: ResolverValue<T>) => void;

type RejectFn = (error?: Error) => void;

type UntilCallback<T> = (resolve: ResolveFn<T>, reject: RejectFn, context: Readonly<UntilContext>) => void;

function looksLikeDelay( delay: unknown ) : delay is Delay
{
  return Number.isInteger( delay ) || typeof delay === 'function';
}

function getDelay( delay: Delay, context: UntilContext ) : number
{
  return typeof delay === 'function' ? delay( context ) : delay;
}

const defaultOptions: Options = {
  delay: 10,
};

/**
 * Return a Promise that delegates resolving/rejecting to the passed in function.
 */
export function until<T>( fn: UntilCallback<T>, options: Options = defaultOptions ) : Promise<T>
{
  if ( typeof fn !== 'function' ) {
    throw new Error('fn must be a function');
  }

  if ( ! options || typeof options !== 'object' ) {
    throw new Error(`invalid options: ${JSON.stringify(options)}`);
  }

  const { delay, timeout, callLimit } = Object.assign({}, defaultOptions, options);

  if ( ! looksLikeDelay( delay ) ) {
    throw new Error('invalid delay value');
  }

  if ( timeout !== undefined && ! looksLikeDelay( timeout ) ) {
    throw new Error('invalid timeout value');
  }

  if ( callLimit !== undefined && ! Number.isInteger( callLimit ) ) {
    throw new Error('invalid callLimit value');
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

    const context: Readonly<UntilContext> = Object.freeze({
      get callCount() {
        return callCount;
      },
      get lastCall() {
        return lastCall;
      },
      get options() {
        return options;
      },
      data: {},
    });

    const callUntilDone = ( fn: UntilCallback<T>, delay: Delay, resolve: ResolveFn<T>, reject: RejectFn ) : void => {
      try {
        if ( callLimit && callCount >= callLimit ) {
          throw new Error(`until callLimit reached: ${callLimit}`);
        }

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

class UntilController
{
  #resolve = undefined;
  #reject = undefined;

  #resolved = false;
  #rejected = false;

  constructor( resolve, reject )
  {
    this.error = undefined;
    this.value = undefined;

    this.timer = null;
    this.timeout = null;

    this.#resolve = resolve;
    this.#reject = reject;

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  get settled()
  {
    return this.#resolved || this.#rejected;
  }

  stop()
  {
    if ( this.timer !== null ) {
      clearTimeout( this.timer );

      this.timer = null;
    }

    if ( this.timeout !== null ) {
      clearTimeout( this.timeout );

      this.timeout = null;
    }
  }

  resolve( value )
  {
    this.value = value;

    this.#resolve( value );

    this.#resolved = true;

    this.stop();

    return this.value;
  }

  reject( error )
  {
    this.error = error;

    this.#reject( error );

    this.#rejected = true;

    this.stop();

    return this.error;
  }
}

function looksLikeDelay( d )
{
  return Number.isInteger( d ) || typeof d === 'function';
}

function getDelay( d )
{
  return typeof d === 'function' ? d() : d;
}

function callUntil( fn, delay, controller )
{
  const ms = getDelay( delay );

  try {
    const returnValue = fn( controller );

    if ( returnValue !== undefined && ! controller.settled ) {
      controller.resolve( returnValue );
    }

    if ( controller.settled ) {
      controller.stop();

      // Don't return anything. The value should be obtained from the controller.
      return;
    }

    controller.timer = setTimeout( callUntil, ms, fn, delay, controller );
  } catch ( error ) {
    controller.reject( error );

    controller.stop();
  }
}

/**
 * Return a Promise that resolves once the fn returns or resolves itself.
 *
 * @param  {Function} fn
 * @param  {Number}   delay
 * @param  {Number}   timeout
 * @return {Promise}
 */
export default function until( fn, delay = 10, timeout = null )
{
  if ( typeof fn !== 'function' ) {
    throw new Error('fn must be a function');
  }

  if ( ! looksLikeDelay( delay ) ) {
    throw new Error('invalid delay value');
  }

  if ( timeout !== null && ! looksLikeDelay( timeout ) ) {
    throw new Error('invalid timeout value');
  }

  return new Promise( ( resolve, reject ) => {
    const controller = new UntilController(resolve, reject);

    callUntil( fn, delay, controller );

    if ( timeout !== null ) {
      controller.timeout = setTimeout(
        () => {
          controller.reject( new Error('timed out') );
        },
        getDelay( timeout )
      );
    }
  });
}


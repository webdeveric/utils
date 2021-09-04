/**
 * Delay a specified number of milliseconds before resolving.
 * The `ms` value can be between zero and the max delay value for `setTimeout`.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value}
 */
export function delay<T>(milliseconds: number, value?: T) : Promise<T>
{
  return new Promise( (resolve, reject) => {
    if ( typeof milliseconds !== 'number' ) {
      const providedType = Object.prototype.toString.call(milliseconds).match(/\[\w+\s(?<type>.+)\]/)?.groups?.type;

      reject( new TypeError(`milliseconds must be a number. ${providedType} was provided.`) );

      return;
    }

    setTimeout( resolve, Math.max(0, Math.min(milliseconds, 2_147_483_647)), value );
  } );
}

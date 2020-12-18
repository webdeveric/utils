import { promises as dns } from 'dns';
import { isIP } from 'net';

export async function hostnameResolvesToIp( hostname: string, ip: string ) : Promise<boolean>
{
  const ipVersion = isIP( ip );

  if ( ! ipVersion ) {
    throw new Error(`Invalid IP: ${ip}`);
  }

  const resolve = ipVersion === 4 ? dns.resolve4 : dns.resolve6;

  const resolved: string[] = await resolve( hostname );

  return resolved.some( (addr: string) : boolean => addr === ip );
}

/**
 * Forward-confirmed reverse DNS
 *
 * @see https://en.wikipedia.org/wiki/Forward-confirmed_reverse_DNS
 */
export async function fcrdns( hostname: string, ip: string ) : Promise<boolean>
{
  const hostnames: string[] = await dns.reverse(ip);

  if ( ! hostnames.length ) {
    throw new Error(`Unable to get hostnames for ${ip}`);
  }

  if ( ! hostnames.every( (name: string) : boolean => name.endsWith( hostname ) ) ) {
    throw new Error(`${ip} does not belong to ${hostname}`);
  }

  // This is an array of booleans.
  const results: boolean[] = await Promise.all(
    hostnames.map(
      name => hostnameResolvesToIp( name, ip )
    )
  );

  return results.some( val => val );
}

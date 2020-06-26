import net from 'net';
import { promises as dns } from 'dns';

export async function hostnameResolvesToIp( hostname, ip )
{
  const ipVersion = net.isIP( ip );

  if ( ! ipVersion ) {
    throw new Error(`Invalid IP: ${ip}`);
  }

  const resolved = await dns[`resolve${ipVersion}`]( hostname );

  return resolved.some( addr => addr === ip );
}

/**
 * Forward-confirmed reverse DNS
 *
 * https://en.wikipedia.org/wiki/Forward-confirmed_reverse_DNS
 *
 * @param {*} ip
 * @param {*} hostname
 */
export async function fcrdns( hostname, ip )
{
  const hostnames = await dns.reverse(ip);

  if ( ! hostnames.length ) {
    throw new Error(`Unable to get hostnames for ${ip}`);
  }

  if ( ! hostnames.every( name => name.endsWith( hostname ) ) ) {
    throw new Error(`${ip} does not belong to ${hostname}`);
  }

  // This is an array of booleans.
  const results = await Promise.all(
    hostnames.map(
      name => hostnameResolvesToIp( name, ip )
    )
  );

  return results.some( val => val === true );
}

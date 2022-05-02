import { promises as dns } from 'node:dns';
import { isIP } from 'node:net';

export async function hostnameResolvesToIp(hostname: string, ip: string): Promise<boolean> {
  const ipVersion = isIP(ip);

  if (!ipVersion) {
    throw new Error(`Invalid IP: ${ip}`);
  }

  const resolve = ipVersion === 4 ? dns.resolve4 : dns.resolve6;

  const resolved = await resolve(hostname);

  return resolved.some(addr => addr === ip);
}

/**
 * Forward-confirmed reverse DNS
 *
 * @see https://en.wikipedia.org/wiki/Forward-confirmed_reverse_DNS
 */
export async function fcrdns(hostname: string, ip: string): Promise<boolean> {
  const hostnames = await dns.reverse(ip);

  if (!hostnames.length) {
    throw new Error(`Unable to get hostnames for ${ip}`);
  }

  if (!hostnames.every(name => name.endsWith(hostname))) {
    throw new Error(`${ip} does not belong to ${hostname}`);
  }

  const results = await Promise.all(hostnames.map(name => hostnameResolvesToIp(name, ip)));

  return results.some(val => val);
}

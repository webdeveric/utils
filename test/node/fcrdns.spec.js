/**
 * @jest-environment node
 */
import { hostnameResolvesToIp, fcrdns } from '../../src/node/fcrdns';

jest.mock('dns', () => {
  return {
    promises: {
      reverse: jest
        .fn(() => [ 'example.com' ] )
        .mockImplementationOnce(() => []),
      resolve4() {
        return [ '0.0.0.1' ];
      },
      resolve6() {
        return [ '::1' ];
      },
    },
  };
});

describe('fcrdns()', () => {
  it('Throws if reverse lookup fails', async () => {
    await expect( fcrdns('example.com', '::1') ).rejects.toBeInstanceOf(Error);
  });

  it('validates an IP and hostname belong together', async () => {
    await expect( fcrdns('example.com', '::1') ).resolves.toBe(true);
    await expect( fcrdns('example.com', '0.0.0.1') ).resolves.toBe(true);
    await expect( fcrdns('localhost', '127.0.0.1') ).rejects.toBeInstanceOf(Error);
  });
});

describe('hostnameResolvesToIp()', () => {
  it('Throws when given invalid IP', async () => {
    await expect( hostnameResolvesToIp('example.com', 'bad.ip.address') ).rejects.toBeInstanceOf(Error);
  });

  it('Returns boolean indicating that the hostname resolves to the IP address', async () => {
    await expect( hostnameResolvesToIp('example.com', '::1') ).resolves.toBe(true);
    await expect( hostnameResolvesToIp('example.com', '::2') ).resolves.toBe(false);
    await expect( hostnameResolvesToIp('example.com', '0.0.0.1') ).resolves.toBe(true);
  });
});

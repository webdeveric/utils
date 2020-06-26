import { hostnameResolvesToIp, fcrdns } from '../src/fcrdns';

describe('hostnameResolvesToIp()', () => {
  it('Throws when given invalid IP', async () => {
    await expect( hostnameResolvesToIp('example.com', 'bad.ip.address') ).rejects.toBeInstanceOf(Error);
  });

  it('Returns boolean indicating that the hostname resolves to the IP address', async () => {
    await expect( hostnameResolvesToIp('ip6-loopback', '::1') ).resolves.toBe(true);
    await expect( hostnameResolvesToIp('ip6-loopback', '::2') ).resolves.toBe(false);
  });
});

describe('fcrdns()', () => {
  it('validates an IP and hostname belong together', async () => {
    await expect( fcrdns('ip6-loopback', '::1') ).resolves.toBe(true);
    await expect( fcrdns('ip6-fake', '::1') ).rejects.toBeInstanceOf(Error);
    await expect( fcrdns('localhost', '127.0.0.1') ).rejects.toBeInstanceOf(Error);
  });
});

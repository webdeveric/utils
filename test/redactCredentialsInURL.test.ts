import { redactCredentialsInURL } from '../src/redactCredentialsInURL.js';

describe('redactCredentialsInURL()', () => {
  it('Redacts credentials in a URL', () => {
    expect(redactCredentialsInURL('http://user:pass@example.com/')).toBe('http://REDACTED:REDACTED@example.com/');
  });

  it('Can customize the mask', () => {
    expect(redactCredentialsInURL('http://user:pass@example.com/', '****')).toBe('http://****:****@example.com/');
    expect(redactCredentialsInURL('http://user:pass@example.com/', '')).toBe('http://example.com/');
  });

  it('Can customize the mask for username and password', () => {
    expect(
      redactCredentialsInURL('http://user:pass@example.com/', {
        username: 'XXXX',
        password: 'YYYY',
      }),
    ).toBe('http://XXXX:YYYY@example.com/');
  });

  it('Invalid URLs get returned as a string', () => {
    expect(redactCredentialsInURL('fake URL')).toBe('fake URL');
  });
});

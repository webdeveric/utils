export type URLMaskOptions =
  | string
  | {
      username: string;
      password: string;
    };

/**
 * Replace the username and password in `input`, a URL, with `mask`.
 *
 * @example
 * ```ts
 * redactCredentialsInURL('https://user:pass@example.com'); // 'https://REDACTED:REDACTED@example.com/'
 * ```
 */
export const redactCredentialsInURL = (
  input: ConstructorParameters<typeof URL>[0],
  mask: URLMaskOptions = 'REDACTED',
): string => {
  try {
    const url = new URL(String(input));

    if (url.username) {
      url.username = typeof mask === 'string' ? mask : mask.username;
    }

    if (url.password) {
      url.password = typeof mask === 'string' ? mask : mask.password;
    }

    return url.toString();
  } catch {
    return String(input);
  }
};

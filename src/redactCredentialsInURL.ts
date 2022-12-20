export type URLMaskOptions =
  | string
  | {
      username: string;
      password: string;
    };

export const redactCredentialsInURL = (input: URL | string, mask: URLMaskOptions = 'REDACTED'): string => {
  try {
    const url = new URL(input);

    if (url.username) {
      url.username = typeof mask === 'string' ? mask : mask.username;
    }

    if (url.password) {
      url.password = typeof mask === 'string' ? mask : mask.password;
    }

    return url.toString();
  } catch (error) {
    return String(input);
  }
};

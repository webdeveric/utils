export const hasSameOrigin = (left: string | URL, right: string | URL): boolean =>
  new URL(left).origin === new URL(right).origin;

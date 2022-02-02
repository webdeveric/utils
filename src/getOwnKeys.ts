export function getOwnKeys<T extends Parameters<typeof Object.keys>[0], K extends keyof T>(data: T): K[] {
  return Object.keys(data) as K[];
}

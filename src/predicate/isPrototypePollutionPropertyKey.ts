export type PrototypePollutionPropertyKey = '__proto__' | 'constructor' | 'prototype';

export function isPrototypePollutionPropertyKey(key: unknown): key is PrototypePollutionPropertyKey {
  return typeof key === 'string' && (key === '__proto__' || key === 'constructor' || key === 'prototype');
}

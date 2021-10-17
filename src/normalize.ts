import cloneDeep from 'lodash.clonedeep';

import type { Builtin } from 'ts-essentials';

import { getOwnKeys } from './getOwnKeys.js';

export type NormalizeContext<R> = {
  record: Readonly<R>;
  current: R;
  data: Record<string, unknown>;
};

export type NormalizerFn<T, R = T> = (
  input: T,
  context: NormalizeContext<R>
) => T;

export type NormalizersTuple<T, R = T> = [initialize: NormalizerFn<T, R>, normalizers: NormalizersRecord<T, R>];

export type NormalizersRecord<T, R = T> = {
  [P in keyof T]?: T[P] extends Builtin
    ? NormalizerFn<T[P], R>
    : (NormalizerFn<T[P], R> | NormalizersRecord<T[P], T> | NormalizersTuple<T[P], R>);
};

const isObject = <T = Record<string, unknown>>(data: unknown): data is T => data !== null && typeof data === 'object' && ! Array.isArray(data);

const isNormalizersTuple = <T, R = T>(data: unknown): data is NormalizersTuple<T, R> => {
  if (Array.isArray(data) && data.length === 2) {
    return isObject(data[ 1 ]);
  }

  return false;
};

export function normalize<R>(record: R, normalizers: NormalizersRecord<R> | NormalizersTuple<R>): R {
  const normalizedRecord = cloneDeep(record);

  const context: NormalizeContext<R> = {
    record,
    current: normalizedRecord,
    data: {},
  };

  const walk = <CR>(currentRecord: CR, currentNormalizers: NormalizersRecord<CR, R> | NormalizersTuple<CR, R>): CR => {
    if ( Array.isArray(currentNormalizers) ) {
      const [ initialize, normalizers ] = currentNormalizers;

      if ( typeof initialize !== 'function' ) {
        throw new TypeError(`initialize is not a function: ${typeof initialize} was provided.`);
      }

      return walk(
        currentRecord ?? initialize(currentRecord, context),
        normalizers,
      );
    }

    if (typeof currentRecord === 'undefined') {
      return currentRecord;
    }

    const keys = getOwnKeys(currentNormalizers);

    for (const key of keys) {
      const normalizer = currentNormalizers[ key ];

      if (typeof normalizer === 'function') {
        currentRecord[ key ] = normalizer(currentRecord[ key ], context);
      } else if (isObject<NormalizersRecord<CR[keyof CR], R>>(normalizer)) {
        currentRecord[ key ] = walk(currentRecord[ key ], normalizer);
      } else if (isNormalizersTuple<CR[keyof CR], R>(normalizer)) {
        currentRecord[ key ] = walk(currentRecord[ key ], normalizer);
      } else {
        throw new TypeError(`Unknown normalizer: ${typeof normalizer}`);
      }
    }

    return currentRecord;
  };

  return walk<R>(normalizedRecord, normalizers);
}

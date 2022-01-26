import cloneDeep from 'lodash.clonedeep';

import type { Builtin } from 'ts-essentials';

import { getOwnProperties } from './getOwnProperties.js';
import { getType } from './getType.js';

export type NormalizeContext<OwnerRecordType> = {
  original: Readonly<OwnerRecordType>;
  current: OwnerRecordType;
  data: Record<PropertyKey, unknown>;
};

export type NormalizerFn<OutputType, OwnerRecordType> = (
  input: unknown,
  context: NormalizeContext<OwnerRecordType>,
) => OutputType;

export type NormalizersRecord<RecordType, OwnerRecordType = RecordType> = {
  [Property in keyof RecordType]?: RecordType[Property] extends Builtin
    ? NormalizerFn<RecordType[Property], OwnerRecordType>
    : NormalizerFn<RecordType[Property], OwnerRecordType> | NormalizersRecord<RecordType[Property], OwnerRecordType>;
};

/**
 * @example
 *
 * ```ts
 * normalize({ demo: true }, { demo: () => false });
 * ```
 *
 * ```ts
 * normalize({ demo: true }, () => ({ demo: false }) });
 * ```
 *
 * ```ts
 * normalize(true, () => false );
 * ```
 */
export function normalize<Data>(
  input: Data,
  normalizers?: NormalizerFn<Data, Data> | NormalizersRecord<Data, Data>,
): Data {
  const normalized = cloneDeep(input);

  const context: NormalizeContext<Data> = Object.seal({
    original: input,
    current: normalized,
    data: {},
  });

  const walk = <CurrentRecord>(
    currentRecord: CurrentRecord,
    currentNormalizers?: NormalizerFn<CurrentRecord, Data> | NormalizersRecord<CurrentRecord, Data>,
  ): CurrentRecord => {
    if (typeof currentNormalizers === 'undefined') {
      return currentRecord;
    }

    if (typeof currentNormalizers === 'function') {
      return currentNormalizers(currentRecord, context);
    }

    if (typeof currentNormalizers === 'object' && currentNormalizers !== null) {
      if (typeof currentRecord === 'object' && currentRecord !== null) {
        return getOwnProperties(currentNormalizers).reduce((data, key) => {
          data[ key ] = walk(data[ key ], currentNormalizers[ key ]);

          return data;
        }, currentRecord);
      }
    } else {
      throw new TypeError(`normalizers must be function or object. ${getType(currentNormalizers)} was received.`);
    }

    return currentRecord;
  };

  return walk(normalized, normalizers);
}

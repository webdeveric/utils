import { getOwnProperties } from './getOwnProperties.js';
import { isObject } from './predicate/isObject.js';

import type { Builtin } from './types/common.js';
import type { AnyRecord } from './types/records.js';

export type NormalizeContext<OwnerRecordType, ContextData extends AnyRecord> = {
  original: Readonly<OwnerRecordType>;
  current: OwnerRecordType;
  data: ContextData;
};

export type NormalizerFn<PropertyType, OwnerRecordType = unknown, ContextData extends AnyRecord = AnyRecord> = (
  input: PropertyType,
  context: NormalizeContext<OwnerRecordType, ContextData>,
) => PropertyType;

export type NormalizersRecord<RecordType, OwnerRecordType, ContextData extends AnyRecord = AnyRecord> = {
  readonly [Property in keyof RecordType]?: RecordType[Property] extends Builtin
    ? NormalizerFn<RecordType[Property], OwnerRecordType, ContextData>
    : AnyNormalizer<RecordType[Property], OwnerRecordType, ContextData>;
};

export type AnyNormalizer<RecordType, OwnerRecordType, ContextData extends AnyRecord = AnyRecord> =
  | NormalizerFn<RecordType, OwnerRecordType, ContextData>
  | NormalizersRecord<RecordType, OwnerRecordType, ContextData>;

export type ContextInitializer<OwnerRecordType, ContextData extends AnyRecord = AnyRecord> = (
  data: OwnerRecordType,
  normalizers: AnyNormalizer<OwnerRecordType, OwnerRecordType, ContextData>,
) => ContextData;

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
export function normalize<Data extends object, ContextData extends AnyRecord = AnyRecord>(
  input: Readonly<Data>,
  normalizers: AnyNormalizer<Data, Data, Partial<ContextData>>, // No initializer so data must be partial
): Data;

export function normalize<Data extends object, ContextData extends AnyRecord = AnyRecord>(
  input: Readonly<Data>,
  normalizers: AnyNormalizer<Data, Data, ContextData>,
  initContextData: ContextInitializer<Data, ContextData>,
): Data;

export function normalize<Data extends object, ContextData extends AnyRecord = AnyRecord>(
  input: Readonly<Data>,
  normalizers: AnyNormalizer<Data, Data, ContextData>,
  initContextData: ContextInitializer<Data, ContextData> = (): AnyRecord => ({}),
): Data {
  const current = structuredClone(input);

  const context: NormalizeContext<Data, ContextData> = Object.seal({
    original: input,
    current,
    data: initContextData(input, normalizers),
  });

  const walk = <CurrentRecord extends AnyRecord>(
    currentRecord: CurrentRecord,
    currentNormalizers?: AnyNormalizer<CurrentRecord, Data, ContextData>,
  ): CurrentRecord => {
    if (typeof currentNormalizers === 'function') {
      return currentNormalizers(currentRecord, context);
    }

    if (isObject(currentNormalizers) && isObject(currentRecord)) {
      return getOwnProperties(currentNormalizers).reduce<CurrentRecord>((data, key) => {
        const innerNormalizers = currentNormalizers[key];
        // If the value is undefined but there is a normalizer record, set value to empty object.
        const value =
          typeof data[key] === 'undefined' && isObject(innerNormalizers)
            ? ({} as unknown as CurrentRecord[keyof CurrentRecord])
            : data[key];

        data[key] = walk(value, innerNormalizers);

        return data;
      }, currentRecord);
    }

    return currentRecord;
  };

  return walk(current, normalizers);
}

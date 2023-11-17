import { getOwnProperties } from './getOwnProperties.js';
import { getType } from './getType.js';

import type { Builtin } from './types/common.js';

export type ConvertFn<SourceType, ReturnType> = (source: Readonly<SourceType>) => ReturnType;

export type ConvertRecord<Input, Output> = {
  [Property in keyof Output]: Output[Property] extends Builtin
    ? ConvertFn<Input, Output[Property]>
    : AnyConverter<Input, Output[Property]>;
};

export type AnyConverter<Input, Output> = ConvertRecord<Input, Output> | ConvertFn<Input, Output>;

export const convert = <Input, Output>(input: Readonly<Input>, converter: AnyConverter<Input, Output>): Output => {
  if (typeof converter === 'function') {
    return converter(input);
  }

  if (typeof converter === 'object' && converter !== null) {
    return getOwnProperties(converter).reduce<Partial<Output>>((data, key) => {
      data[key] = convert(input, converter[key]);

      return data;
    }, {}) as Output;
  }

  throw new TypeError(`${getType(converter)} is not a valid converter`);
};

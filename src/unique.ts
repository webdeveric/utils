import { isAsyncIterable } from './predicate/isAsyncIterable.js';
import { isIterable } from './predicate/isIterable.js';

export type UniqueOptions<Type> = {
  /**
   * Return a custom ID to uniquely identify an item.
   */
  identity?: (item: Type) => unknown;
  /**
   * Return `true` to yield the item.
   *
   * Use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter when available.
   */
  filter?: (item: Type) => boolean;
};

export function unique<Type>(items: AsyncIterable<Type>, options?: UniqueOptions<Type>): AsyncIterable<string>;

export function unique<Type>(items: Iterable<Type>, options?: UniqueOptions<Type>): Iterable<Type>;

export function unique(items: string, options?: UniqueOptions<string>): Iterable<string>;

export function unique<Type>(
  items: AsyncIterable<Type> | Iterable<Type>,
  options: UniqueOptions<Type> = {},
): AsyncIterable<Type> | Iterable<Type> {
  const ids = new Set<unknown>();
  const { filter, identity } = options;

  if (typeof items === 'string' || isIterable(items)) {
    return {
      *[Symbol.iterator]() {
        for (const item of items) {
          if (!filter || filter(item) === true) {
            const id = identity?.(item) ?? item;

            if (!ids.has(id)) {
              ids.add(id);

              yield item;
            }
          }
        }
      },
    };
  }

  if (isAsyncIterable(items)) {
    return {
      async *[Symbol.asyncIterator]() {
        for await (const item of items) {
          if (!filter || filter(item) === true) {
            const id = identity?.(item) ?? item;

            if (!ids.has(id)) {
              ids.add(id);

              yield item;
            }
          }
        }
      },
    };
  }

  throw new TypeError('items must be an Iterable or AsyncIterable');
}

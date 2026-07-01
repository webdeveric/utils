import { isAsyncIterable } from './predicate/isAsyncIterable.js';
import { isIterable } from './predicate/isIterable.js';

export type MembershipStore<T> = {
  has(value: T): boolean;
  add(value: T): void;
};

export type UniqueOptions<Type> = {
  /**
   * Return a custom ID to uniquely identify an item.
   */
  identity?: (item: Type) => unknown;
  /**
   * Return `true` to yield the item.
   *
   * @todo Refactor to use `filter` on the (async)iterator when available.
   * @see https://github.com/tc39/proposal-async-iterator-helpers
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter
   */
  filter?: (item: Type) => boolean;
  /**
   * A store to keep track of which items have been seen.
   *
   * If you have a large dataset, you may want to use a more memory-efficient store than a `Set`, such as a Bloom filter.
   *
   * @default `Set<unknown>`.
   */
  store?: MembershipStore<unknown>;
};

export function unique<Type>(items: AsyncIterable<Type>, options?: UniqueOptions<Type>): AsyncIterable<Type>;

export function unique<Type>(items: Iterable<Type>, options?: UniqueOptions<Type>): Iterable<Type>;

export function unique<Type>(
  items: AsyncIterable<Type> | Iterable<Type>,
  options?: UniqueOptions<Type>,
): AsyncIterable<Type> | Iterable<Type>;

export function unique<Type>(
  items: AsyncIterable<Type> | Iterable<Type>,
  options: UniqueOptions<Type> = {},
): AsyncIterable<Type> | Iterable<Type> {
  const { filter, identity, store = new Set<unknown>() } = options;

  if (typeof items === 'string' || isIterable(items)) {
    return {
      *[Symbol.iterator]() {
        for (const item of items) {
          if (!filter || filter(item) === true) {
            const id = identity?.(item) ?? item;

            if (!store.has(id)) {
              store.add(id);

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

            if (!store.has(id)) {
              store.add(id);

              yield item;
            }
          }
        }
      },
    };
  }

  throw new TypeError('items must be an Iterable or AsyncIterable');
}

type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;

type Listener = () => void;
type Unsubscribe = () => void;

export type FetchStore<Result, Input> = {
  getResult: (input: Input) => Result;
  prefetch: (input: Input) => void;
  subscribe: (input: Input, listener: Listener) => Unsubscribe;
};

/**
 * create fetch store
 *
 * @example
 * import { createFetchStore } from 'react-hooks-fetch';
 *
 * const fetchFunc = async (userId) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
 * const store = createFetchStore(fetchFunc);
 */
export function createFetchStore<Result, Input>(
  fetchFunc: FetchFunc<Result, Input>,
) {
  type CacheItem = {
    getResult: () => Result;
    listeners: Set<Listener>;
  };
  const cache = new Map<Input, CacheItem>();
  const createGetResult = (input: Input) => {
    let promise: Promise<void> | null = null;
    let result: Result | null = null;
    let error: Error | null = null;
    promise = (async () => {
      try {
        result = await fetchFunc(input);
      } catch (e) {
        error = e;
      } finally {
        promise = null;
      }
    })();
    const getResult = () => {
      if (promise) throw promise;
      if (error !== null) throw error;
      if (result === null) throw new Error(); // should not happen
      return result;
    };
    return getResult;
  };
  const prefetch = (input: Input) => {
    const cacheItem = cache.get(input);
    if (cacheItem) {
      cacheItem.getResult = createGetResult(input);
      cacheItem.listeners.forEach((listener) => listener());
    } else {
      cache.set(input, {
        getResult: createGetResult(input),
        listeners: new Set<Listener>(),
      });
    }
  };
  const subscribe = (input: Input, listener: () => void) => {
    const cacheItem = cache.get(input);
    if (!cacheItem) throw new Error('needs to prefetch in advance');
    const { listeners } = cacheItem;
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0 && cacheItem === cache.get(input)) {
        cache.delete(input);
      }
    };
  };
  const store: FetchStore<Result, Input> = {
    getResult: (input: Input) => {
      const cacheItem = cache.get(input);
      if (!cacheItem) throw new Error('needs to prefetch in advance');
      return cacheItem.getResult();
    },
    prefetch,
    subscribe,
  };
  return store;
}

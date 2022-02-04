type FetchFunc<Input, Result> = (input: Input) => Promise<Result>;

export type FetchStore<Input, Result> = {
  prefetch: (input: Input) => void;
  evict: (input: Input) => void;
  use: (input: Input, mark?: symbol) => () => void;
  getResult: (input: Input) => Result;
};

type UsedMarks = Set<symbol>;

type Options<Input, Result> = {
  preloaded?: Iterable<{ input: Input; result: Result }>;
  areEqual?: (a: Input, b: Input) => boolean;
};

/**
 * create fetch store
 *
 * @example
 * import { createFetch } from 'react-hooks-fetch';
 *
 * const fetchFunc = async (userId) => {
 *   const res = await fetch(`https://reqres.in/api/users/${userId}?delay=3`));
 *   const data = await res.json();
 *   return data;
 * };
 * const store = createFetch(fetchFunc);
 * store.prefetch('1');
 */
export function createFetch<Input, Result>(
  fetchFunc: FetchFunc<Input, Result>,
  options?: Options<Input, Result>,
) {
  const preloaded = options?.preloaded;
  const areEqual = options?.areEqual;
  type GetResult = () => Result;
  const cache = new Map<Input, [GetResult, UsedMarks]>();
  const setCache = (input: Input, getResult: GetResult) => {
    if (areEqual) {
      for (const key of cache.keys()) {
        if (areEqual(key, input)) {
          return false;
        }
      }
    } else if (cache.has(input)) {
      return false;
    }
    cache.set(input, [getResult, new Set()]);
    return true;
  };
  const getCache = (input: Input) => {
    if (areEqual) {
      for (const [key, value] of cache) {
        if (areEqual(key, input)) {
          return value;
        }
      }
      return undefined;
    }
    return cache.get(input);
  };
  const deleteCache = (input: Input) => {
    if (areEqual) {
      for (const key of cache.keys()) {
        if (areEqual(key, input)) {
          cache.delete(key);
          return true;
        }
      }
      return false;
    }
    return cache.delete(input);
  };
  if (preloaded) {
    for (const item of preloaded) {
      setCache(item.input, () => item.result);
    }
  }
  const createGetResult = (input: Input) => {
    let promise: Promise<void> | null = null;
    let result: Result | null = null;
    let error: unknown | null = null;
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
      return result as Result;
    };
    return getResult;
  };
  const prefetch = (input: Input) => {
    setCache(input, createGetResult(input));
  };
  const evict = (input: Input) => {
    deleteCache(input);
  };
  const use = (input: Input, mark = Symbol()) => {
    const usedMarks = getCache(input)?.[1];
    if (!usedMarks) throw new Error('call prefetch in advance');
    usedMarks.add(mark);
    return () => {
      // check if it's already evicted
      if (usedMarks === getCache(input)?.[1]) {
        usedMarks.delete(mark);
        if (!usedMarks.size) {
          deleteCache(input);
        }
      }
    };
  };
  const store: FetchStore<Input, Result> = {
    prefetch,
    evict,
    use,
    getResult: (input: Input) => {
      const getResult = getCache(input)?.[0];
      if (!getResult) throw new Error('call prefetch in advance');
      return getResult();
    },
  };
  return store;
}

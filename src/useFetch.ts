import { useCallback, useState } from 'react';

import { FetchStore } from './createFetchStore';

/**
 * useFetch hook
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const [data, refetch] = useFetch(store, initialInput);
 */
export function useFetch<Result, Input>(
  store: FetchStore<Result, Input>,
  initialInput: Input,
) {
  const [result, setResult] = useState(() => store.getResult(initialInput));
  const refetch = useCallback((nextInput: Input) => {
    store.prefetch(nextInput);
    setResult(() => store.getResult(nextInput));
  }, [store]);
  return [result, refetch] as const;
}

import { useCallback, useEffect, useState } from 'react';

import { FetchStore } from './createFetch';

type Refetch<Input> = (input: Input) => void;

export function useFetch<Input, Result>(
  store: FetchStore<Input, Result>,
  initialInput: Input,
): [undefined extends Input ? Result | undefined : Result, Refetch<Input>];

export function useFetch<Input, Result>(
  store: FetchStore<Input, Result>,
  initialInput?: Input,
): [Result | undefined, Refetch<Input>];

/**
 * useFetch hook
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const [result, refetch] = useFetch(store, initialInput);
 */
export function useFetch<Input, Result>(
  store: FetchStore<Input, Result>,
  initialInput?: Input,
) {
  const [input, setInput] = useState(initialInput);
  const [result, setResult] = useState(() => {
    if (initialInput === undefined) return undefined;
    return store.getResult(initialInput);
  });
  useEffect(() => {
    if (input !== undefined) {
      return store.use(input);
    }
    return undefined;
  }, [store, input]);
  const refetch = useCallback((nextInput: Input) => {
    store.prefetch(nextInput);
    setInput(nextInput);
    setResult(() => store.getResult(nextInput));
  }, [store]);
  return [result, refetch];
}

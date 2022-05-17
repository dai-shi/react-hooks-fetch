import { useCallback } from 'react';

import { FetchDesc } from './types';
import { useFetchState, useSetFetchState } from './context';
import { createFetchState } from './createFetch';

/**
 * useRefetch hook
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const Refetch = useRefetch(desc);
 * Refetch('1');
 */
export function useRefetch<Input, Result>(
  desc: FetchDesc<Input, Result>,
) {
  const setFetchState = useSetFetchState(desc);
  const refetch = useCallback((input: Input) => {
    setFetchState(createFetchState(desc, input));
  }, [setFetchState, desc]);
  return refetch;
}

export function useFetch<Input, Result>(
  desc: FetchDesc<Input, Result>,
  options: { allowUndefined: true },
): {
  input: Input | undefined;
  result: Result | undefined;
  refetch: (input: Input) => void;
};

export function useFetch<Input, Result>(
  desc: FetchDesc<Input, Result>,
): {
  input: Input;
  result: Result;
  refetch: (input: Input) => void;
};

/**
 * useFetch hook
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const { input, result, refetch } = useFetch(desc);
 */
export function useFetch<Input, Result>(
  desc: FetchDesc<Input, Result>,
  options?: { allowUndefined: boolean },
) {
  let state = useFetchState(desc);
  if (!state && options?.allowUndefined) {
    state = { input: undefined as unknown as Input };
  }
  if (!state) {
    throw new Error('missing initial input');
  }
  if ('promise' in state) {
    throw state.promise;
  }
  if ('error' in state) {
    throw state.error;
  }
  return {
    input: state.input,
    result: state.result as Result,
    refetch: useRefetch(desc),
  };
}

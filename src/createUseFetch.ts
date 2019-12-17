/* eslint arrow-parens: off */ // FIXME why does it complain?

import { useCallback, useState } from 'react';
import { prefetch } from 'react-suspense-fetch';

type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;

export const createUseFetch = <Result extends object, Input>(
  fetchFunc: FetchFunc<Result, Input>,
  initialInput: Input,
) => {
  const initialResult = prefetch(fetchFunc, initialInput);
  const useFetch = () => {
    const [result, setResult] = useState(initialResult);
    const refetch = useCallback((input) => {
      setResult(prefetch(fetchFunc, input));
    }, []);
    return { result, refetch };
  };
  return useFetch;
};

export const createUseFetchWithoutPrefetch = <Result extends object, Input>(
  fetchFunc: FetchFunc<Result, Input>,
) => {
  const useFetch = () => {
    const [result, setResult] = useState<Result | null>(null);
    const refetch = useCallback((input) => {
      setResult(prefetch(fetchFunc, input));
    }, []);
    return { result, refetch };
  };
  return useFetch;
};

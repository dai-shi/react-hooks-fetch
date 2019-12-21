import { useCallback, useEffect, useState } from 'react';
import { prefetch } from 'react-suspense-fetch';

type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;

export const createUseFetch = <Result extends object, Input>(
  fetchFunc: FetchFunc<Result, Input>,
  initialInput: Input,
) => {
  const prefetched = prefetch(fetchFunc, initialInput);
  const useFetch = () => {
    const [result, setResult] = useState(prefetched);
    const refetch = useCallback((input: Input) => {
      setResult(prefetch(fetchFunc, input));
    }, []);
    return { result, refetch };
  };
  return useFetch;
};

export const createUseFetchWithoutPrefetch = <Result extends object, Input>(
  fetchFunc: FetchFunc<Result, Input>,
) => {
  const useFetch = (initialInput?: Input) => {
    const [result, setResult] = useState<Result | null>(null);
    useEffect(() => {
      if (initialInput !== undefined) {
        setResult(prefetch(fetchFunc, initialInput));
      }
    }, [initialInput]);
    const refetch = useCallback((input: Input) => {
      setResult(prefetch(fetchFunc, input));
    }, []);
    return { result, refetch };
  };
  return useFetch;
};

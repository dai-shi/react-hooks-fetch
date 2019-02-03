import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

const forcedReducer = state => !state;
const useForceUpdate = () => useReducer(forcedReducer, false)[1];

const createPromiseResolver = () => {
  let resolve;
  const promise = new Promise((r) => { resolve = r; });
  return { resolve, promise };
};

const defaultOpts = {};
const defaultReadBody = body => body.json();

export const useFetch = (input, opts = defaultOpts) => {
  const forceUpdate = useForceUpdate();
  const started = useRef(false);
  const error = useRef(null);
  const loading = useRef(true);
  const data = useRef(null);
  const abortController = useRef(null);
  const abort = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
  }, []);
  const promiseResolver = useMemo(createPromiseResolver, [input, opts]);
  const {
    readBody = defaultReadBody,
    noSuspense = false,
    ...init
  } = opts;
  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      abortController.current = controller;
      started.current = true;
      error.current = null;
      loading.current = true;
      data.current = null;
      forceUpdate();
      try {
        const response = await fetch(input, {
          signal: abortController.current.signal,
          ...init,
        });
        if (response.ok) {
          const body = await readBody(response);
          if (abortController.current === controller) {
            data.current = body;
            abortController.current = null;
          }
        } else if (abortController.current === controller) {
          error.current = new Error(response.statusText);
          abortController.current = null;
        }
      } catch (e) {
        if (abortController.current === controller) {
          error.current = e;
          abortController.current = null;
        }
      }
      started.current = false;
      loading.current = false;
      promiseResolver.resolve();
      forceUpdate();
    })();
    const cleanup = () => {
      if (abortController.current) {
        abortController.current.abort();
        abortController.current = null;
      }
    };
    return cleanup;
  }, [input, opts]);
  if (!noSuspense && started.current && loading.current) {
    throw promiseResolver.promise;
  }
  return {
    error: error.current,
    ...(noSuspense ? { loading: loading.current } : {}),
    data: data.current,
    abort,
  };
};

import {
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

const forcedReducer = state => !state;
const useForceUpdate = () => useReducer(forcedReducer, false)[1];

const createFetchError = (response) => {
  const err = new Error(`${response.status} ${response.statusText}`);
  err.name = 'FetchError';
  return err;
};

const createPromiseResolver = () => {
  let resolve;
  const promise = new Promise((r) => { resolve = r; });
  return { resolve, promise };
};

const defaultOpts = {};
const defaultReadBody = body => body.json();

export const useFetch = (input, opts = defaultOpts) => {
  const forceUpdate = useForceUpdate();
  const error = useRef(null);
  const loading = useRef(false);
  const data = useRef(null);
  const promiseResolver = useMemo(createPromiseResolver, [input, opts]);
  // Using layout effect may not be ideal, but unless we run the effect
  // synchronously, Suspense fallback isn't rendered in ConcurrentMode.
  useLayoutEffect(() => {
    let finished = false;
    const abortController = new AbortController();
    (async () => {
      if (!input) return;
      // start fetching
      loading.current = true;
      forceUpdate();
      const onFinish = (e, d) => {
        if (!finished) {
          finished = true;
          error.current = e;
          data.current = d;
          loading.current = false;
        }
      };
      try {
        const { readBody = defaultReadBody, ...init } = opts;
        const response = await fetch(input, {
          ...init,
          signal: abortController.signal,
        });
        // check response
        if (response.ok) {
          const body = await readBody(response);
          onFinish(null, body);
        } else {
          onFinish(createFetchError(response), null);
        }
      } catch (e) {
        onFinish(e, null);
      }
      // finish fetching
      promiseResolver.resolve();
    })();
    const cleanup = () => {
      if (!finished) {
        finished = true;
        abortController.abort();
      }
      error.current = null;
      loading.current = false;
      data.current = null;
    };
    return cleanup;
  }, [input, opts]);
  if (loading.current) throw promiseResolver.promise;
  return {
    error: error.current,
    data: data.current,
  };
};

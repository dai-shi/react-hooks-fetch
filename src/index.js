import { useLayoutEffect, useMemo, useState } from 'react';

import { checkInfiniteLoop } from './dev-utils';

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

const initialState = {};

const defaultOpts = {};
const defaultReadBody = body => body.json();

export const useFetch = (input, opts = defaultOpts) => {
  const [state, setState] = useState(initialState);
  const promiseResolver = useMemo(createPromiseResolver, [input, opts]);
  // Using layout effect may not be ideal, but unless we run the effect
  // synchronously, Suspense fallback isn't rendered in Concurrent Mode.
  useLayoutEffect(() => {
    if (process.env.NODE_ENV !== 'production') checkInfiniteLoop(input);
    let setStateSafe = s => setState(s);
    let abortController = new AbortController();
    (async () => {
      if (!input) return;
      // start fetching
      setStateSafe({ loading: true });
      try {
        const { readBody = defaultReadBody, ...init } = opts;
        const response = await fetch(input, {
          ...init,
          signal: abortController.signal,
        });
        // check response
        if (response.ok) {
          const body = await readBody(response);
          setStateSafe({ data: body });
        } else {
          setStateSafe({ error: createFetchError(response) });
        }
      } catch (e) {
        setStateSafe({ error: e });
      }
      // finish fetching
      promiseResolver.resolve();
    })();
    const cleanup = () => {
      setStateSafe = () => null; // we should not setState after cleanup.
      abortController.abort();
      abortController = null;
      setState(initialState);
    };
    return cleanup;
  }, [input, opts, promiseResolver]);
  if (state.loading) throw promiseResolver.promise;
  return state;
};

import {
  useLayoutEffect,
  useMemo,
  useReducer,
} from 'react';

const createFetchError = (response) => {
  const err = new Error(`${response.status} ${response.statusText}`);
  err.name = 'FetchError';
  return err;
};

const initialState = { loading: false, error: null, data: null };
const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return initialState;
    case 'start':
      if (state.loading) return state; // to bail out, just in case
      return { ...state, loading: true };
    case 'data':
      if (!state.loading) return state; // to bail out, just in case
      return { ...state, loading: false, data: action.data };
    case 'error':
      if (!state.loading) return state; // to bail out, just in case
      return { ...state, loading: false, error: action.error };
    default:
      throw new Error('no such action type');
  }
};

const createPromiseResolver = () => {
  let resolve;
  const promise = new Promise((r) => { resolve = r; });
  return { resolve, promise };
};

const defaultOpts = {};
const defaultReadBody = body => body.json();

export const useFetch = (input, opts = defaultOpts) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const promiseResolver = useMemo(createPromiseResolver, [input, opts]);
  // Using layout effect may not be ideal, but unless we run the effect
  // synchronously, Suspense fallback isn't rendered in ConcurrentMode.
  useLayoutEffect(() => {
    let dispatchSafe = action => dispatch(action);
    const abortController = new AbortController();
    (async () => {
      if (!input) return;
      // start fetching
      dispatchSafe({ type: 'start' });
      try {
        const { readBody = defaultReadBody, ...init } = opts;
        const response = await fetch(input, {
          ...init,
          signal: abortController.signal,
        });
        // check response
        if (response.ok) {
          const body = await readBody(response);
          dispatchSafe({ type: 'data', data: body });
        } else {
          dispatchSafe({ type: 'error', error: createFetchError(response) });
        }
      } catch (e) {
        dispatchSafe({ type: 'error', error: e });
      }
      // finish fetching
      promiseResolver.resolve();
    })();
    const cleanup = () => {
      dispatchSafe = () => null; // we should not dispatch after unmounted.
      abortController.abort();
      dispatch({ type: 'init' });
    };
    return cleanup;
  }, [input, opts]);
  if (state.loading) throw promiseResolver.promise;
  return state;
};

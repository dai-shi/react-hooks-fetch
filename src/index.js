import {
  createElement,
  Component,
  useEffect,
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
  useEffect(() => {
    let finished = false;
    const abortController = new AbortController();
    (async () => {
      if (!input) return;
      // start fetching
      error.current = null;
      loading.current = true;
      data.current = null;
      forceUpdate();
      try {
        const {
          readBody = defaultReadBody,
          ...init
        } = opts;
        const response = await fetch(input, {
          ...init,
          signal: abortController.signal,
        });
        // check response
        if (response.ok) {
          const body = await readBody(response);
          if (!finished) {
            finished = true;
            data.current = body;
            loading.current = false;
          }
        } else if (!finished) {
          finished = true;
          error.current = createFetchError(response);
          loading.current = false;
        }
      } catch (e) {
        if (!finished) {
          finished = true;
          error.current = e;
          loading.current = false;
        }
      }
      // finish fetching
      promiseResolver.resolve();
      forceUpdate();
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
  if (error.current) throw error.current;
  if (loading.current) throw promiseResolver.promise;
  return data.current;
};

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { children, renderError } = this.props;
    const { error } = this.state;
    if (error) {
      return createElement(renderError, { error });
    }
    return children;
  }
}

import { Component, useCallback, useState } from 'react';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  retry = () => { this.setState({ error: null }); };

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;
    if (error) {
      if (typeof fallback === 'function') {
        return fallback(error, this.retry);
      }
      return fallback;
    }
    return children;
  }
}

const isPromise = x => typeof x.then === 'function';

const createRunFetch = (fetchFunc) => {
  const runFetch = (input) => {
    const state = { pending: true };
    const start = async () => {
      try {
        state.data = await fetchFunc(input);
      } catch (e) {
        if (isPromise(e)) {
          try {
            await e;
          } finally {
            await start();
          }
        } else {
          state.error = e;
        }
      } finally {
        state.pending = false;
      }
    };
    state.promise = start();
    return {
      get data() {
        if (state.pending) throw state.promise;
        if (state.error) throw state.error;
        return state.data;
      },
      get refetch() {
        return runFetch;
      },
    };
  };
  return runFetch;
};

export const createFetcher = (fetchFunc) => {
  const runFetch = createRunFetch(fetchFunc);
  return {
    prefetch: input => runFetch(input),
    lazyFetch: (fallbackData) => {
      let suspendable = null;
      const fetchOnce = (input) => {
        if (!suspendable) {
          suspendable = runFetch(input);
        }
        return suspendable;
      };
      return {
        get data() {
          return suspendable ? suspendable.data : fallbackData;
        },
        get refetch() {
          return suspendable ? suspendable.refetch : fetchOnce;
        },
        get lazy() {
          return !suspendable;
        },
      };
    },
  };
};

export const useSuspendable = (suspendable) => {
  const [result, setResult] = useState(suspendable);
  const origRefetch = suspendable.refetch;
  return {
    get data() {
      return result.data;
    },
    refetch: useCallback((nextInput) => {
      const nextResult = origRefetch(nextInput);
      setResult(nextResult);
    }, [origRefetch]),
    lazy: result.lazy,
  };
};

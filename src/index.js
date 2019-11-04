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

export const createFetcher = (fetchFunc) => {
  const refetch = (input) => {
    const state = { pending: true };
    state.promise = (async () => {
      try {
        state.data = await fetchFunc(input);
      } catch (e) {
        state.error = e;
      } finally {
        state.pending = false;
      }
    })();
    return {
      get data() {
        if (state.pending) throw state.promise;
        if (state.error) throw state.error;
        return state.data;
      },
      get refetch() {
        return refetch;
      },
    };
  };
  return {
    prefetch: input => refetch(input),
    lazyFetch: (fallbackData) => {
      let suspendable = null;
      const fetchOnce = (input) => {
        if (!suspendable) {
          suspendable = refetch(input);
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
  const origFetch = suspendable.refetch;
  return {
    get data() {
      return result.data;
    },
    refetch: useCallback((nextInput) => {
      const nextResult = origFetch(nextInput);
      setResult(nextResult);
    }, [origFetch]),
    lazy: result.lazy,
  };
};

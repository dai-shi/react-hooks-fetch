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

export const createFetch = (fetchFunc, initialInput, initialData) => {
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
  if (initialInput) {
    return refetch(initialInput);
  }
  return {
    get data() {
      return initialData;
    },
    get refetch() {
      return refetch;
    },
  };
};

export const useFetch = (initialResult) => {
  const [result, setResult] = useState(initialResult);
  const origRefetch = result.refetch;
  return {
    get data() {
      return result.data;
    },
    refetch: useCallback((nextInput) => {
      const nextResult = origRefetch(nextInput);
      setResult(nextResult);
      return nextResult;
    }, [origRefetch]),
  };
};

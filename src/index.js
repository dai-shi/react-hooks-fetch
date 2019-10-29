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
    fallback: data => ({ data, refetch }),
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
  };
};

export const useSuspendableList = (fetcher, initialList = []) => {
  const [list, setList] = useState(initialList);
  const origFetch = fetcher.prefetch;
  return {
    get data() {
      return list.map(item => item.data);
    },
    append: useCallback((nextInput) => {
      const nextResult = origFetch(nextInput);
      setList(prev => [...prev, nextResult]);
    }, [origFetch]),
    insert: useCallback((nextInput, index) => {
      const nextResult = origFetch(nextInput);
      setList(prev => [...prev.slice(0, index), nextResult, prev.slice(index)]);
    }, [origFetch]),
    remove: useCallback((index) => {
      setList(prev => [...prev.slice(0, index), prev.slice(index + 1)]);
    }, []),
  };
};

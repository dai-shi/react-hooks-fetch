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

const createFetchFunc = (input) => {
  if (typeof input === 'function') return input;
  return async () => {
    const response = await fetch(input);
    const data = await response.json();
    return data;
  };
};

export const prefetch = (input) => {
  const fetchFunc = createFetchFunc(input);
  const state = { pending: true };
  state.promise = (async () => {
    try {
      state.data = await fetchFunc();
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
  };
};

export const initialize = data => ({
  get data() {
    return data;
  },
});

export const useFetch = (initialResult) => {
  const [result, setResult] = useState(initialResult);
  result.refetch = useCallback((nextInput) => {
    const nextResult = prefetch(nextInput);
    setResult(nextResult);
  }, []);
  return result;
};

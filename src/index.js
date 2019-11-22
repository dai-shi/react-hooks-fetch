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

const transformInput = async (transformFunc, input) => {
  while (transformFunc) {
    try {
      return transformFunc(input);
    } catch (e) {
      if (isPromise(e)) {
        await e;
      } else {
        throw e;
      }
    }
  }
  return input;
};

export const createFetcher = (fetchFunc, transformFunc) => {
  const run = (input) => {
    const state = { pending: true };
    const start = async () => {
      try {
        state.data = await fetchFunc(await transformInput(transformFunc, input));
      } catch (e) {
        state.error = e;
      } finally {
        state.pending = false;
      }
    };
    state.promise = start();
    return new Proxy({}, {
      get(target, key) {
        if (state.pending) throw state.promise;
        if (state.error) throw state.error;
        if (typeof state.data[key] === 'function') {
          // For something like Array.prototype.map
          // Is there a better way?
          return state.data[key].bind(state.data);
        }
        return state.data[key];
      },
    });
  };
  return { run };
};

export const useFetcher = (fetcher, initialSuspendable) => {
  const [suspendable, setSuspendable] = useState(initialSuspendable);
  return {
    data: suspendable,
    refetch: useCallback((nextInput) => {
      const nextSuspendable = fetcher.run(nextInput);
      setSuspendable(nextSuspendable);
    }, [fetcher]),
  };
};

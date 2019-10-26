import { useCallback, useState } from 'react';

const createFetchFunc = (input) => {
  if (typeof input === 'function') return input;
  return async () => {
    const response = await fetch(input);
    const data = await response.json();
    return data;
  };
};

export const createAsync = (input) => {
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

export const createStatic = data => ({
  get data() {
    return data;
  },
});

export const useAsync = (initialResult) => {
  const [result, setResult] = useState(initialResult);
  result.refetch = useCallback((nextInput) => {
    const nextResult = createAsync(nextInput);
    setResult(nextResult);
  }, []);
  return result;
};

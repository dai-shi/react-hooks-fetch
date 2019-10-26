import { useCallback, useState } from 'react';

const createFetchFunc = (input) => {
  if (typeof input === 'function') return input;
  return async () => {
    const response = await fetch(input);
    const data = await response.json();
    return data;
  };
};

export const createResource = (input) => {
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

export const useResource = (initialResource) => {
  const [resource, setResource] = useState(initialResource);
  const refetch = useCallback((nextInput) => {
    const nextResource = createResource(nextInput);
    setResource(nextResource);
  }, []);
  if (!resource) {
    return { refetch };
  }
  resource.refetch = refetch;
  return resource;
};

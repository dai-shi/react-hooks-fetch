import {
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';

const defaultOpts = {};

export const useFetch = (input, opts = defaultOpts) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const abortController = useRef(null);
  const abort = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
  }, []);
  const {
    readBody = body => body.json(),
    ...init
  } = opts;
  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      abortController.current = controller;
      setError(null);
      setLoading(true);
      setData(null);
      try {
        const response = await fetch(input, {
          signal: abortController.current.signal,
          ...init,
        });
        if (response.ok) {
          const body = await readBody(response);
          if (abortController.current === controller) {
            setData(body);
            setLoading(false);
            abortController.current = null;
          }
        } else if (abortController.current === controller) {
          setError(new Error(response.statusText));
          setLoading(false);
          abortController.current = null;
        }
      } catch (e) {
        if (abortController.current === controller) {
          setError(e);
          setLoading(false);
          abortController.current = null;
        }
      }
    })();
    const cleanup = () => {
      if (abortController.current) {
        abortController.current.abort();
        abortController.current = null;
      }
    };
    return cleanup;
  }, [input, opts]);
  return {
    error,
    loading,
    data,
    abort,
  };
};

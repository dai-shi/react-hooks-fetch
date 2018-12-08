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
  const controller = useRef(new AbortController());
  const abort = useCallback(() => controller.current.abort());
  const {
    readBody = body => body.json(),
    ...init
  } = opts;
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(input, {
          signal: controller.current.signal,
          ...init,
        });
        if (response.ok) {
          const body = await readBody(response);
          setData(body);
        } else {
          setError(new Error(response.statusText));
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    })();
  }, [input, opts]);
  return {
    error,
    loading,
    data,
    abort,
  };
};

import {
  useState,
  useEffect,
} from 'react';

const defaultOpts = {};

export const useFetch = (input, opts = defaultOpts) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const {
    readBody = body => body.json(),
    ...init
  } = opts;
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(input, init);
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
  return { error, loading, data };
};

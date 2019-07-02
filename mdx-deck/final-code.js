const defaultOpts = {};
const defaultReadBody = body => body.json();
const useFetch = (
  url,
  opts = defaultOpts,
  readBody = defaultReadBody,
) => {
  const [state, setState] = useState({});
  useEffect(() => {
    let didCleanup = false;
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...opts,
          signal: abortController.signal
        });
        if (!response.ok) {
          throw new Error('status: ' + response.status);
        }
        const data = await readBody(response);
        if (!didCleanup) {
          setState({ data });
        }
      } catch (error) {
        if (!didCleanup) {
          setState({ error });
        }
      }
    };
    setState({ loading: true });
    fetchData();
    const cleanup = () => {
      didCleanup = true;
      abortController.abort();
      setState({});
    };
    return cleanup;
  }, [url]);
  return state;
};

import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <span>Error:{error.message}</span>
);

const Loading = () => <span>Loading...</span>;

const opts = {
  headers: {
    'X-My-Header': 'hello',
    'X-Your-Header': 'world',
  },
};

const DisplayRemoteData = () => {
  const { error, loading, data } = useFetch('https://httpbin.org/get', opts);
  if (error) return <Err error={error} />;
  if (loading) return <Loading />;
  return <span>RemoteData:{JSON.stringify(data)}</span>;
};

export default DisplayRemoteData;

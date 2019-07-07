import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const Err: React.FC<{ error: Error }> = ({ error }) => <span>Error: {error.message}</span>;

const opts = {
  headers: {
    'X-My-Header': 'hello',
    'X-Your-Header': 'world',
  },
};

const DisplayRemoteData = () => {
  const { error, data } = useFetch('https://httpbin.org/get', opts);
  if (error) return <Err error={error} />;
  if (!data) return null;
  return <div>RemoteData: {JSON.stringify(data)}</div>;
};

export default DisplayRemoteData;

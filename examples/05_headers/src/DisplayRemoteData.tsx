import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const opts = {
  headers: {
    'X-My-Header': 'hello',
    'X-Your-Header': 'world',
  },
};

const DisplayRemoteData = () => {
  const data = useFetch('https://httpbin.org/get', opts);
  if (!data) return null;
  return <div>RemoteData:{JSON.stringify(data)}</div>;
};

export default DisplayRemoteData;

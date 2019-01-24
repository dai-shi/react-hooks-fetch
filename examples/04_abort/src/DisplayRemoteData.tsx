import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <span>
    Error:
    [
    {error.name}
    ]
    {error.message}
  </span>
);

const Loading: React.SFC<{ abort: () => void }> = ({ abort }) => (
  <div>
    <span>Loading...</span>
    <button type="button" onClick={abort}>Abort</button>
  </div>
);

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const {
    error,
    loading,
    data,
    abort,
  } = useFetch(url);
  if (error) return <Err error={error} />;
  if (loading) return <Loading abort={abort} />;
  return (
    <div>
      RemoteData:
      {data.title}
    </div>
  );
};

export default DisplayRemoteData;

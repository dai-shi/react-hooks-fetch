import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <span>
    Error:
    {error.message}
  </span>
);

const Loading = () => <span>Loading...</span>;

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const { error, loading, data } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (error) return <Err error={error} />;
  if (loading) return <Loading />;
  return (
    <span>
      RemoteData:
      {data.title}
    </span>
  );
};

export default DisplayRemoteData;

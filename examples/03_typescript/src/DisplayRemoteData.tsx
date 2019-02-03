import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const Err: React.FC<{ error: Error }> = ({ error }) => <span>Error:{error.message}</span>;

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const { error, data } = useFetch<{ title: string }>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (error) return <Err error={error} />;
  if (!data) return null;
  return <span>RemoteData:{data.title}</span>;
};

export default DisplayRemoteData;

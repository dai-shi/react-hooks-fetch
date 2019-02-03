import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <span>Error:{error.message}</span>
);

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const url = `https://reqres.in/api/users/${id}?delay=1`;
  const { error, data } = useFetch(url);
  if (error) return <Err error={error} />;
  if (!data) return null; // this is not very nice though
  return <div>RemoteData:{data.data.first_name}</div>;
};

export default DisplayRemoteData;

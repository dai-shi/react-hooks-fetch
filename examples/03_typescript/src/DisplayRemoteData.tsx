/* eslint-disable camelcase */

import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const Err: React.FC<{ error: Error }> = ({ error }) => <span>Error: {error.message}</span>;

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const url = `https://reqres.in/api/users/${id}?delay=3`;
  const { error, data } = useFetch<{ data: { first_name: string } }>(url);
  if (error) return <Err error={error} />;
  if (!data) return null;
  return <div>RemoteData: {data.data.first_name}</div>;
};

export default DisplayRemoteData;

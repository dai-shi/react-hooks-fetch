/* eslint-disable camelcase */

import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const url = id && `https://reqres.in/api/users/${id}?delay=3`;
  const data = useFetch<{ data: { first_name: string } }>(url);
  if (!id || !data) return null;
  return <div>RemoteData:{data.data.first_name}</div>;
};

export default DisplayRemoteData;

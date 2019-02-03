import * as React from 'react';

import { useFetch } from 'react-hooks-fetch';

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const data = useFetch<{ title: string }>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!data) return null;
  return <span>RemoteData:{data.title}</span>;
};

export default DisplayRemoteData;

import React, { useState } from 'react';

import { useFetch } from 'react-hooks-fetch';

import { store } from './fetchStore';
import DisplayData from './DisplayData';

const Item: React.FC = () => {
  const [id, setId] = useState('1');
  const { result, refetch } = useFetch(store, '1' as string);
  return (
    <div>
      User ID: <input value={id} onChange={(e) => setId(e.target.value)} />
      <DisplayData id={id} result={result} refetch={refetch} />
    </div>
  );
};

export const ErrorItem: React.FC = () => {
  const { result, refetch } = useFetch(store, '1' as string);
  return (
    <div>
      <DisplayData id="-1" result={result} refetch={refetch} />
      <span>Refetch that causes a fetch error</span>
    </div>
  );
};

export default Item;

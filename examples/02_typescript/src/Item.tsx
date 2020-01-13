import React, { useState } from 'react';

import { prefetch, useFetch } from 'react-hooks-fetch';

import { fetchFunc } from './fetchFuncs';
import DisplayData from './DisplayData';

const suspendable = prefetch(fetchFunc, '1');

const Item: React.FC = () => {
  const [id, setId] = useState('1');
  const { result, refetch } = useFetch(suspendable);
  return (
    <div>
      User ID: <input value={id} onChange={(e) => setId(e.target.value)} />
      <DisplayData id={id} result={result} refetch={refetch} />
    </div>
  );
};

export const ErrorItem: React.FC = () => {
  const { result, refetch } = useFetch(suspendable);
  return (
    <div>
      <DisplayData id="-1" result={result} refetch={refetch} />
      <span>Refetch that causes a fetch error</span>
    </div>
  );
};

export default Item;

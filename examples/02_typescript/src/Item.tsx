import React, { useState } from 'react';

import { prefetch, useSuspendableFetch } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

const fetchFunc = async (userId: string) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const initialId = '1';
const initialResult = prefetch<
  { data: { first_name: string } },
  string
>(fetchFunc, initialId);

const Item: React.FC = () => {
  const [id, setId] = useState(initialId);
  const result = useSuspendableFetch(initialResult);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} />
    </div>
  );
};

export default Item;

import React, { useState } from 'react';

import { prefetch, useFetch } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

const initialId = '1';
const initialResult = prefetch<{ data: { first_name: string } }>(`https://reqres.in/api/users/${initialId}?delay=3`);

const Item: React.FC = () => {
  const [id, setId] = useState(initialId);
  const result = useFetch(initialResult);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} />
    </div>
  );
};

export default Item;

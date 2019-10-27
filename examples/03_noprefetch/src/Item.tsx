import React, { useState } from 'react';

import { createFetch, useFetch } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

const fetchFunc = async (userId: string) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const initialResult = createFetch(fetchFunc, null, { data: { first_name: '' } });

const Item: React.FC = () => {
  const [id, setId] = useState('');
  const result = useFetch(initialResult);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} />
    </div>
  );
};

export default Item;

import React, { useState } from 'react';

import { createAsync, useAsync } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

const initialResult = createAsync<{ data: { first_name: string } }>('https://reqres.in/api/users/1?delay=3');

const Item: React.FC = () => {
  const [id, setId] = useState('1');
  const result = useAsync(initialResult);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} />
    </div>
  );
};

export default Item;

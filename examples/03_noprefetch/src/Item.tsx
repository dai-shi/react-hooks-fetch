import React, { useState } from 'react';

import { initialize, useFetch } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

const initialResult = initialize({ data: { first_name: '' } });

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

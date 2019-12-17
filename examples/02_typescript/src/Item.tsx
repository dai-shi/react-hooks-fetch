import React, { useState } from 'react';

import { useFetch } from './hooks';
import DisplayData from './DisplayData';

const Item: React.FC = () => {
  const [id, setId] = useState('1');
  const { result, refetch } = useFetch();
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} refetch={refetch} />
    </div>
  );
};

export default Item;

import React, { useState } from 'react';

import { useFetch } from 'react-hooks-fetch';

import { store } from './fetchStore';
import DisplayData from './DisplayData';

type Props = {
  initialId?: string;
};

const Item: React.FC<Props> = ({ initialId }) => {
  const [id, setId] = useState(initialId);
  const [result, refetch] = useFetch(store, initialId);
  return (
    <div>
      User ID: <input value={id || ''} onChange={(e) => setId(e.target.value)} />
      <DisplayData id={id || ''} result={result || null} refetch={refetch} />
    </div>
  );
};

export default Item;

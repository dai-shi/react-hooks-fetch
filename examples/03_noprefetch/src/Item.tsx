import React, { useState } from 'react';

import { useFetchWithoutPrefetch } from 'react-hooks-fetch';

import { fetchFunc } from './fetchFuncs';
import DisplayData from './DisplayData';

type Props = {
  initialId?: string;
};

const Item: React.FC<Props> = ({ initialId }) => {
  const [id, setId] = useState(initialId || '');
  const { result, refetch } = useFetchWithoutPrefetch(fetchFunc, initialId);
  return (
    <div>
      User ID: <input value={id} onChange={(e) => setId(e.target.value)} />
      <DisplayData id={id} result={result} refetch={refetch} />
    </div>
  );
};

export default Item;

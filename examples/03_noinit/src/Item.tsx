import React, { useState } from 'react';

import { useFetch } from 'react-hooks-fetch';

import { Result } from './fetchStore';
import DisplayData from './DisplayData';

type Props = {
  fetchFunc: (userId: string) => Promise<Result>;
};

const Item = ({ fetchFunc }: Props) => {
  const { input, result, refetch } = useFetch(fetchFunc, { allowUndefined: true });
  const [id, setId] = useState(input);
  return (
    <div>
      User ID: <input value={id || ''} onChange={(e) => setId(e.target.value)} />
      <DisplayData id={id || ''} result={result || null} refetch={refetch} />
    </div>
  );
};

export default Item;

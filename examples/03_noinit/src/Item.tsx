import React, { useState } from 'react';

import { useFetch } from 'react-hooks-fetch';

import { DescType } from './fetchStore';
import DisplayData from './DisplayData';

type Props = {
  desc: DescType;
};

const Item = ({ desc }: Props) => {
  const { input, result, refetch } = useFetch(desc, { allowUndefined: true });
  const [id, setId] = useState(input);
  return (
    <div>
      User ID: <input value={id || ''} onChange={(e) => setId(e.target.value)} />
      <DisplayData id={id || ''} result={result || null} refetch={refetch} />
    </div>
  );
};

export default Item;

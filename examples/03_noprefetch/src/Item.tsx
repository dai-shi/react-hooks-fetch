import React, { useState } from 'react';

import { useFetch } from './hooks';
import DisplayData from './DisplayData';

type Props = {
  initialId?: string;
};

const Item: React.FC<Props> = ({ initialId }) => {
  const [id, setId] = useState(initialId || '');
  const { result, refetch } = useFetch(initialId);
  return (
    <div>
      User ID: <input value={id} onChange={(e) => setId(e.target.value)} />
      <DisplayData id={id} result={result} refetch={refetch} />
    </div>
  );
};

export default Item;

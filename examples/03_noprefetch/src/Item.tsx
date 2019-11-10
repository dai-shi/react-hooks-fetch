import React, { useLayoutEffect, useRef, useState } from 'react';

import { useFetcher } from 'react-hooks-fetch';

import { fetcher } from './App';
import DisplayData from './DisplayData';

type Props = {
  initialId?: string;
};

const Item: React.FC<Props> = ({ initialId = '' }) => {
  const [id, setId] = useState('');
  const result = useFetcher(fetcher);
  const initialized = useRef(false);
  useLayoutEffect(() => {
    if (!initialized.current && initialId !== id) {
      initialized.current = true;
      setId(initialId);
      result.refetch(initialId);
    }
  }, [initialId, id, result]);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} />
    </div>
  );
};

export default Item;

import React, { useLayoutEffect, useRef, useState } from 'react';

import { useFetcher } from 'react-hooks-fetch';

import { fetcher, initialSuspendable } from './App';
import DisplayData from './DisplayData';

type Props = {
  initialId?: string;
};

const Item: React.FC<Props> = ({ initialId = '' }) => {
  const [id, setId] = useState('');
  const result = useFetcher(fetcher, initialSuspendable);
  const initialized = useRef(false);
  useLayoutEffect(() => {
    if (!initialized.current && initialId !== id) {
      setId(initialId);
      result.refetch(initialId);
    }
    initialized.current = true;
  }, [initialId, id, result]);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} />
    </div>
  );
};

export default Item;

import React, { useState } from 'react';

import { Suspendable, useFetcher } from 'react-hooks-fetch';

import { fetcher } from './App';
import DisplayData from './DisplayData';

type Props = {
  initialId: string;
  initialSuspendable: Suspendable<{ data: { first_name: string } }>;
};

const Item: React.FC<Props> = ({ initialId, initialSuspendable }) => {
  const [id, setId] = useState(initialId);
  const result = useFetcher(fetcher, initialSuspendable);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} />
    </div>
  );
};

export default Item;

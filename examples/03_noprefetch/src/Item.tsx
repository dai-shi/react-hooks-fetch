import React, { useState } from 'react';

import { Suspendable, useSuspendable } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

type Props = {
  initialId?: string;
  suspendable: Suspendable<{ data: { first_name: string } }, string>;
};

const Item: React.FC<Props> = ({ initialId = '', suspendable }) => {
  const [id, setId] = useState(initialId);
  const result = useSuspendable(suspendable);
  if (initialId && result.lazy) {
    result.refetch(initialId);
  }
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} result={result} />
    </div>
  );
};

export default Item;

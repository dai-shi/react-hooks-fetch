import React, { useEffect, useState } from 'react';

import { useFetch } from 'react-hooks-fetch';

import { desc } from './fetchStore';
import DisplayData from './DisplayData';

const Item = () => {
  const { input, result, refetch } = useFetch(desc);
  const [id, setId] = useState(input);
  useEffect(() => {
    setId(input);
  }, [input]);
  return (
    <div>
      User ID: <input value={id} onChange={(e) => setId(e.target.value)} />
      <DisplayData id={id} result={result} refetch={refetch} />
    </div>
  );
};

export const ErrorItem = () => {
  const { result, refetch } = useFetch(desc);
  return (
    <div>
      <DisplayData id="-1" result={result} refetch={refetch} />
      <span>Refetch that causes a fetch error</span>
    </div>
  );
};

export const DummyErrorItem = () => {
  const { result } = useFetch(desc);
  const [override, setOverride] = useState<typeof result | null>(null);
  return (
    <div>
      <DisplayData id="-1" result={override || result} refetch={() => setOverride({} as typeof result)} />
      <span>Refetch that causes a fetch error</span>
    </div>
  );
};

export default Item;

import React, { useState } from 'react';

import { createEmptyData, useResource } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

const initialResource = createEmptyData({ data: { first_name: '' } });

const Item: React.FC = () => {
  const [id, setId] = useState('');
  const resource = useResource(initialResource);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} resource={resource} />
    </div>
  );
};

export default Item;

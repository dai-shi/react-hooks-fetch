import React, { useState } from 'react';

import { createResource, useResource } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

const initialResource = createResource<{ data: { first_name: string } }>('https://reqres.in/api/users/1?delay=3');

const Item: React.FC = () => {
  const [id, setId] = useState('1');
  const resource = useResource(initialResource);
  return (
    <div>
      User ID: <input value={id} onChange={e => setId(e.target.value)} />
      <DisplayData id={id} resource={resource} />
    </div>
  );
};

export default Item;

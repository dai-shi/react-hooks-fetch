import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const { useState } = React;

const App = () => {
  const [id1, setId1] = useState('1');
  const [id2, setId2] = useState('2');
  return (
    <div>
      <div>
        <input value={id1} onChange={e => setId1(e.target.value)} />
      </div>
      <div>
        {id1 && <DisplayRemoteData id={id1} />}
      </div>
      <div>
        <input value={id2} onChange={e => setId2(e.target.value)} />
      </div>
      <div>
        {id2 && <DisplayRemoteData id={id2} />}
      </div>
    </div>
  );
};

export default App;

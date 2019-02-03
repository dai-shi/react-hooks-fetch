import * as React from 'react';

import { ErrorBoundary } from 'react-hooks-fetch';

import DisplayRemoteData from './DisplayRemoteData';

const { Suspense, useState } = React;

const Err: React.FC<{ error: Error }> = ({ error }) => <span>Error:{error.message}</span>;

const Loading: React.FC<{ abort: () => void }> = ({
  abort,
}) => (
  <span>
    Loading...
    <button type="button" onClick={abort}>abort</button>
  </span>
);

const App = () => {
  const [id1, setId1] = useState('1');
  const [id2, setId2] = useState('2');
  const [stop1, setStop1] = useState(false);
  const [stop2, setStop2] = useState(false);
  return (
    <div>
      <div>
        <input value={id1} onChange={e => setId1(e.target.value)} />
      </div>
      <ErrorBoundary renderError={Err} key={`first:${id1}`}>
        <Suspense fallback={<Loading abort={() => setStop1(true)} />} key={`stop:${stop1}`}>
          {!stop1 ? (
            <DisplayRemoteData id={id1} />
          ) : (
            <span>
              Aborted
              <button type="button" onClick={() => setStop1(false)}>retry</button>
            </span>
          )}
        </Suspense>
      </ErrorBoundary>
      <div>
        <input value={id2} onChange={e => setId2(e.target.value)} />
      </div>
      <ErrorBoundary renderError={Err} key={`second:${id2}`}>
        <Suspense fallback={<Loading abort={() => setStop2(true)} />} key={`stop:${stop2}`}>
          {!stop2 ? (
            <DisplayRemoteData id={id2} />
          ) : (
            <span>
              Aborted
              <button type="button" onClick={() => setStop2(false)}>retry</button>
            </span>
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;

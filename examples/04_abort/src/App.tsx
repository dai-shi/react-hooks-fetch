import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const {
  StrictMode,
  Suspense,
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
  useReducer,
} = React;

const Loading: React.FC<{ abort: () => void }> = ({
  abort,
}) => (
  <span>
    Loading...
    <button type="button" onClick={abort}>abort</button>
  </span>
);

type State = { id: string; stop: boolean };
type Action =
  | { type: 'setId'; id: string }
  | { type: 'incId' }
  | { type: 'stop' }
  | { type: 'retry' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setId': return { id: action.id, stop: false };
    case 'incId': return { id: `${Number(state.id) + 1}`, stop: false };
    case 'stop': return { ...state, stop: true };
    case 'retry': return { ...state, stop: false };
    default: return state;
  }
};

const App = () => {
  const [state1, dispatch1] = useReducer(reducer, { id: '1', stop: false });
  const { id: id1, stop: stop1 } = state1;
  const [state2, dispatch2] = useReducer(reducer, { id: '2', stop: false });
  const { id: id2, stop: stop2 } = state2;
  return (
    <StrictMode>
      <ConcurrentMode>
        <div>
          <div>
            <input value={id1} onChange={e => dispatch1({ type: 'setId', id: e.target.value })} />
            <button type="button" onClick={() => dispatch1({ type: 'incId' })}>+1</button>
          </div>
          <div>
            <Suspense fallback={<Loading abort={() => dispatch1({ type: 'stop' })} />} key={id1}>
              {!stop1 ? (
                <DisplayRemoteData id={id1} />
              ) : (
                <span>
                  Aborted
                  <button type="button" onClick={() => dispatch1({ type: 'retry' })}>retry</button>
                </span>
              )}
            </Suspense>
          </div>
          <div>
            <input value={id2} onChange={e => dispatch2({ type: 'setId', id: e.target.value })} />
            <button type="button" onClick={() => dispatch2({ type: 'incId' })}>+1</button>
          </div>
          <div>
            <Suspense fallback={<Loading abort={() => dispatch2({ type: 'stop' })} />} key={id2}>
              {!stop2 ? (
                <DisplayRemoteData id={id2} />
              ) : (
                <span>
                  Aborted
                  <button type="button" onClick={() => dispatch2({ type: 'retry' })}>retry</button>
                </span>
              )}
            </Suspense>
          </div>
        </div>
      </ConcurrentMode>
    </StrictMode>
  );
};

export default App;

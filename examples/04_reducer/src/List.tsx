import React, {
  Reducer,
  useReducer,
  useState,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  useTransition,
} from 'react';


import { Suspendable, createFetcher } from 'react-hooks-fetch';

import DisplayData from './DisplayData';

type Data = {
  data: {
    first_name: string;
  };
};

const fetchFunc = async (userId: string) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const fetcher = createFetcher<Data, string>(fetchFunc);

type State = {
  id: string;
  result: Suspendable<Data, string>;
}[];

const initialState: State = [];

export type Action =
  | { type: 'ADD'; suspendable: Suspendable<Data, string> }
  | { type: 'DEL'; id: string };

let nextId = 0;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {
        id: String(++nextId),
        result: action.suspendable,
      }];
    case 'DEL':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

const List: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 4000,
  });
  const [userId, setUserId] = useState('');
  const add = () => {
    startTransition(() => {
      dispatch({ type: 'ADD', suspendable: fetcher.prefetch(userId) });
    });
    setUserId('');
  };
  return (
    <ul>
      {state.map(({ id, result }) => (
        <li key={id}><DisplayData id={id} result={result} dispatch={dispatch} /></li>
      ))}
      <li>
        User ID (1,2,3,...):
        <input value={userId} onChange={e => setUserId(e.target.value)} />
        <button type="button" onClick={add}>Add</button>
        {isPending && 'Pending...'}
      </li>
    </ul>
  );
};

export default List;

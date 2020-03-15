import { createFetchStore } from 'react-hooks-fetch';

export type Result = { data: { first_name: string } };

const fetchFunc = async (userId: string) => {
  const res = await fetch(`https://reqres.in/api/users/${userId}?delay=3`);
  const result: Result = await res.json();
  return result;
};

export const store = createFetchStore(fetchFunc);

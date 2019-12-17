import { createUseFetchWithoutPrefetch } from 'react-hooks-fetch';

const fetchFunc = async (userId: string) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();

export const useFetch = createUseFetchWithoutPrefetch<
  { data: { first_name: string } },
  string
>(fetchFunc);

import { createUseFetch } from 'react-hooks-fetch';

const fetchFunc = async (userId: string) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();

export const useFetch = createUseFetch<
  { data: { first_name: string } },
  string
>(fetchFunc, '1');

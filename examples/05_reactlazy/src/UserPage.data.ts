import { createFetcher } from 'react-hooks-fetch';

export type UserData = {
  data: {
    id: number;
    first_name: string;
  };
};

const fetchFunc = async (userId: string) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const fetcher = createFetcher<UserData, string>(fetchFunc);

export const fetchUserData = (userId: string) => fetcher.prefetch(userId);

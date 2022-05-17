export type Result = { data: { first_name: string } };

const fetchFunc = async (userId: string) => {
  const res = await fetch(`https://reqres.in/api/users/${userId}?delay=3`);
  const result: Result = await res.json();
  return result;
};

export const fetchFunc1 = (userId: string) => fetchFunc(userId);
export const fetchFunc2 = (userId: string) => fetchFunc(userId);
export const fetchFunc3 = (userId: string) => fetchFunc(userId);
export const fetchFunc4 = (userId: string) => fetchFunc(userId);

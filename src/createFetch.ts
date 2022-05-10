import { FetchFunc, FetchDesc, FetchState } from './types';

/**
 * create fetch descriptor
 *
 * @example
 * import { createFetch } from 'react-hooks-fetch';
 *
 * const fetchFunc = async (userId) => {
 *   const res = await fetch(`https://reqres.in/api/users/${userId}?delay=3`));
 *   const data = await res.json();
 *   return data;
 * };
 * const desc = createFetch(fetchFunc);
 */
export function createFetch<Input, Result>(
  fetchFunc: FetchFunc<Input, Result>,
): FetchDesc<Input, Result> {
  return {
    func: fetchFunc,
  };
}

export const createFetchState = <Input, Result>(
  desc: FetchDesc<Input, Result>,
  input: Input,
) => {
  const state: FetchState<Input, Result> = {
    input,
  };
  state.promise = new Promise<void>((resolve, reject) => {
    desc.func(input).then((r) => {
      state.result = r;
      resolve();
    }).catch((e) => {
      state.error = e;
      reject(e);
    }).finally(() => {
      delete state.promise;
    });
  });
  return state;
};

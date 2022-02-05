import {
  Dispatch,
  Reducer,
  useEffect,
  useReducer,
} from 'react';

import { FetchStore } from './createFetch';

type Refetch<Input> = (input: Input) => void;

type State<Input, Result> = {
  store: FetchStore<Input, Result>;
  input: Input | undefined;
  result: Result | undefined;
  refetch: Refetch<Input>;
};

const initializeState = <Input, Result>(
  store: FetchStore<Input, Result>,
  initialInput: Input | undefined,
  dispatch: Dispatch<{ type: 'NEW_INPUT', input: Input }>,
) => ({
    store,
    input: initialInput,
    result: initialInput === undefined ? undefined : store.getResult(initialInput),
    refetch: (nextInput: Input) => {
      store.prefetch(nextInput);
      dispatch({ type: 'NEW_INPUT', input: nextInput });
    },
  });

export function useFetch<Input, Result>(
  store: FetchStore<Input, Result>,
  initialInput: Input,
): {
  input: Input;
  result: undefined extends Input ? Result | undefined : Result;
  refetch: Refetch<Input>;
};

export function useFetch<Input, Result>(
  store: FetchStore<Input, Result>,
  initialInput?: Input,
): {
  input: Input | undefined;
  result: Result | undefined;
  refetch: Refetch<Input>;
};

/**
 * useFetch hook
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const { result, refetch } = useFetch(store, initialInput);
 */
export function useFetch<Input, Result>(
  store: FetchStore<Input, Result>,
  initialInput?: Input,
) {
  type Action = { type: 'NEW_STORE' } | { type: 'NEW_INPUT', input: Input };
  const [state, dispatch] = useReducer<
    Reducer<State<Input, Result>, Action>,
    undefined
  >(
    (prev, action): State<Input, Result> => {
      if (action.type === 'NEW_STORE') {
        if (prev.store === store) {
          // not changed
          return prev;
        }
        return initializeState(store, initialInput, (a: Action) => dispatch(a));
      }
      if (action.type === 'NEW_INPUT') {
        return {
          ...prev,
          input: action.input,
          result: store.getResult(action.input),
        };
      }
      return prev;
    },
    undefined,
    (): State<Input, Result> => initializeState(
      store,
      initialInput,
      (a: Action) => dispatch(a),
    ),
  );
  useEffect(() => {
    dispatch({ type: 'NEW_STORE' });
  }, [store]);
  const { input } = state;
  useEffect(() => {
    if (input === undefined) {
      return undefined;
    }
    return store.use(input);
  }, [store, input]);
  return state;
}

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
): State<Input, Result> => ({
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
  type ReducerState = [State<Input, Result>, FetchStore<Input, Result>]
  const [[state, storeFromUseReducer], dispatch] = useReducer<
    Reducer<ReducerState, Action>,
    undefined
  >(
    (prev, action): ReducerState => {
      if (action.type === 'NEW_STORE') {
        return [
          initializeState(store, initialInput, (a: Action) => dispatch(a)),
          store,
        ];
      }
      if (action.type === 'NEW_INPUT') {
        return [
          {
            ...prev[0],
            input: action.input,
            result: store.getResult(action.input),
          },
          prev[1],
        ];
      }
      return prev;
    },
    undefined,
    (): ReducerState => [
      initializeState(
        store,
        initialInput,
        (a: Action) => dispatch(a),
      ),
      store,
    ],
  );
  if (storeFromUseReducer !== store) {
    dispatch({ type: 'NEW_STORE' });
  }
  const { input } = state;
  useEffect(() => {
    if (input === undefined) {
      return undefined;
    }
    return store.use(input);
  }, [store, input]);
  return state;
}

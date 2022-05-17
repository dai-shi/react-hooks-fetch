import {
  ComponentType,
  Dispatch,
  ReactNode,
  SetStateAction,
  createElement,
  useCallback,
  useState,
} from 'react';

import { createContext, useContextSelector, useContextUpdate } from 'use-context-selector';

export type FetchFunc<Input, Result> = (input: Input) => Promise<Result>;

export type FetchState<Input, Result> = {
  input: Input;
  result?: Result;
  error?: unknown;
  promise?: Promise<void>;
}

export const createFetchState = <Input, Result>(
  fn: FetchFunc<Input, Result>,
  input: Input,
) => {
  const state: FetchState<Input, Result> = {
    input,
  };
  state.promise = new Promise<void>((resolve, reject) => {
    fn(input).then((r) => {
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

const NO_PROVIDER = 'NO_PROVIDER';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchMap = Map<FetchFunc<any, any>, FetchState<any, any>>;

type MapState = readonly [
  FetchMap,
  Dispatch<SetStateAction<FetchMap>>
]

const FetchContext = createContext<MapState | null>(null);

type FetchProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/require-default-props
  initialInputs?: Iterable<readonly [FetchFunc<any, any>, any]>
  children: ReactNode;
};

/**
 * FetchProvider component
 *
 * Put this component higher in the component tree.
 *
 * @example
 * import { FetchProvider } from 'react-hooks-fetch';
 *
 * const App = () => (
 *   <FetchProvider initialInputs={[[fn, input]]}>
 *     ...
 *   </FetchProvider>
 * );
 */
export const FetchProvider = ({ initialInputs, children }: FetchProviderProps) => {
  const createMap = () => {
    const map = new Map();
    if (initialInputs) {
      for (const [fn, input] of initialInputs) {
        map.set(fn, createFetchState(fn, input));
      }
    }
    return map;
  };
  return createElement(
    FetchContext.Provider as ComponentType<{ value: MapState }>,
    { value: useState(createMap) },
    children,
  );
};

export const useFetchState = <Input, Result>(
  fn: FetchFunc<Input, Result>,
) => {
  const state = useContextSelector(
    FetchContext,
    (mapState) => {
      if (!mapState) {
        return NO_PROVIDER;
      }
      return mapState[0].get(fn) as FetchState<Input, Result> | undefined;
    },
  );
  if (state === NO_PROVIDER) {
    throw new Error('missing Provider');
  }
  return state;
};

export const useSetFetchState = <Input, Result>(
  fn: FetchFunc<Input, Result>,
) => {
  const update = useContextUpdate(FetchContext);
  const setMapState = useContextSelector(
    FetchContext,
    (mapState) => {
      if (!mapState) {
        return NO_PROVIDER;
      }
      return mapState[1];
    },
  );
  if (setMapState === NO_PROVIDER) {
    throw new Error('missing Provider');
  }
  const setFetchState = useCallback((
    nextState: FetchState<Input, Result>,
  ) => {
    update(() => {
      setMapState((prev) => new Map(prev).set(fn, nextState));
    }, { suspense: true });
  }, [update, setMapState, fn]);
  return setFetchState;
};

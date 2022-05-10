import {
  ComponentType,
  Dispatch,
  ReactNode,
  SetStateAction,
  createElement,
  useCallback,
  useState,
  // wip
  createContext,
  useContext,
} from 'react';

// import { createContext, useContextSelector, useContextUpdate } from 'use-context-selector';

import { FetchDesc, FetchState } from './types';
import { createFetchState } from './createFetch';

const useContextUpdate = (_Ctx: any) => (fn: any) => fn();
const useContextSelector = (Ctx: any, selector: any) => selector(useContext(Ctx));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchMap = Map<FetchDesc<any, any>, FetchState<any, any>>;

type MapState = readonly [
  FetchMap,
  Dispatch<SetStateAction<FetchMap>>
]

const FetchContext = createContext<MapState | null>(null);

type FetchProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/require-default-props
  initialInputs?: Iterable<readonly [FetchDesc<any, any>, any]>
  children: ReactNode;
};

/**
 * FetchProvider component
 *
 * Put this component higher in the component tree
 *
 * @example
 * import { FetchProvider } from 'react-hooks-fetch';
 *
 * const App = () => (
 *   <FetchProvider initialInputs={[[desc, input]]}>
 *     ...
 *   </FetchProvider>
 * );
 */
export const FetchProvider = ({ initialInputs, children }: FetchProviderProps) => {
  const createMap = () => {
    const map = new Map();
    if (initialInputs) {
      for (const [desc, input] of initialInputs) {
        map.set(desc, createFetchState(desc, input));
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
  desc: FetchDesc<Input, Result>,
) => {
  const state = useContextSelector(
    FetchContext,
    (mapState) => {
      if (!mapState) {
        return 'NO_PROVIDER';
      }
      return mapState[0].get(desc) as FetchState<Input, Result> | undefined;
    },
  );
  if (state === 'NO_PROVIDER') {
    throw new Error('missing Provider');
  }
  return state;
};

export const useSetFetchState = <Input, Result>(
  desc: FetchDesc<Input, Result>,
) => {
  const update = useContextUpdate(FetchContext);
  const setMapState = useContextSelector(
    FetchContext,
    (mapState) => {
      if (!mapState) {
        return 'NO_PROVIDER';
      }
      return mapState[1];
    },
  );
  if (setMapState === 'NO_PROVIDER') {
    throw new Error('missing Provider');
  }
  const setFetchState = useCallback((
    nextState: FetchState<Input, Result>,
  ) => {
    update(() => {
      setMapState((prev) => new Map(prev).set(desc, nextState));
    });
  }, [update, setMapState, desc]);
  return setFetchState;
};

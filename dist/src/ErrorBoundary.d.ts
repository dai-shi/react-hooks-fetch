import { Component, ReactNode } from 'react';
declare type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);
declare type Props = {
    fallback: Fallback;
};
declare type State = {
    error: Error | null;
};
/**
 * ErrorBoundary with retry support
 *
 * @example
 * import { ErrorBoundary } from 'react-hooks-fetch';
 *
 * const App = () => (
 *   <ErrorBoundary
 *     fallback={({ error, retry }) => (
 *       <div>
 *         <span>{error.message}</span>
 *         <button type="button" onClick={retry}>Retry</button>
 *       </div>
 *     )}
 *   >
 *     ...
 *   </ErrorBoundary>
 * };
 */
export declare class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    retry: () => void;
    render(): any;
}
export {};

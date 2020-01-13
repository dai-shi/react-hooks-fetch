import { Component, ReactNode } from 'react';

type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);

type Props = {
  fallback: Fallback;
};

type State = {
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
export class ErrorBoundary extends Component<Props, State> {
  state = { error: null } as State;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  retry = () => { this.setState({ error: null }); };

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;
    if (error) {
      if (typeof fallback === 'function') {
        return fallback(error, this.retry);
      }
      return fallback;
    }
    return children;
  }
}

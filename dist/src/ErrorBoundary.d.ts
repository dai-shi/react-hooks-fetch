import { Component, ReactNode } from 'react';
declare type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);
declare type Props = {
    fallback: Fallback;
};
declare type State = {
    error: Error | null;
};
export declare class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    retry: () => void;
    render(): any;
}
export {};

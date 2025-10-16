import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 m-4">
          <h2 className="text-red-400 font-bold mb-2">⚠️ Component Error</h2>
          <p className="text-gray-300 text-sm">
            Something went wrong in this component. Please refresh the page or try again.
          </p>
          {this.state.error && (
            <details className="mt-2">
              <summary className="text-red-400 cursor-pointer text-xs">Error Details</summary>
              <pre className="text-xs text-gray-400 mt-2 overflow-auto">
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 bg-background rounded-lg shadow-lg text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              We're sorry, but an unexpected error occurred. Please try again later.
            </p>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
              <Button onClick={this.handleReset}>Try Again</Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left p-4 bg-muted/50 rounded-md overflow-auto max-h-40">
                <summary className="font-medium text-sm cursor-pointer">Error Details</summary>
                <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

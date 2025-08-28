import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading, navigateTo } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Use navigateTo instead of Navigate component
      navigateTo(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    }
  }, [isAuthenticated, isLoading, location.pathname, navigateTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Show loading state while redirecting
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

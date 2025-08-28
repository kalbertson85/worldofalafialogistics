import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-6">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
          </Button>
          
          <Button asChild className="gap-2">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

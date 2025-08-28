import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';
import { TwoFactorAuth } from '@/components/auth/TwoFactorAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const { login, isLoading, error, is2FAPending } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect URL from query params or location state
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // If we get here, 2FA is required
      setShow2FA(true);
    } catch (error) {
      // Error is already handled in the AuthContext
      console.error('Login error:', error);
    }
  };

  const handleBackFrom2FA = () => {
    setShow2FA(false);
  };

  // Function to handle back navigation
  const handleBack = () => {
    const referrer = document.referrer;
    const currentHost = window.location.hostname;
    const isSameDomain = referrer && new URL(referrer).hostname === currentHost;
    const isAuthPage = referrer?.includes('/login') || referrer?.includes('/register');

    if (isSameDomain && !isAuthPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(-1);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate('/'), 100);
    }
  };

  if (show2FA || is2FAPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-900">
          <TwoFactorAuth email={email} onBack={handleBackFrom2FA} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-900">
        <div className="relative text-center">
          <button 
            onClick={handleBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

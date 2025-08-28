import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await register({ name, email, password });
    }
  };

  // Function to handle back navigation
  const handleBack = () => {
    const referrer = document.referrer;
    const currentHost = window.location.hostname;
    const isSameDomain = referrer && new URL(referrer).hostname === currentHost;
    const isAuthPage = referrer?.includes('/login') || referrer?.includes('/register');

    if (isSameDomain && !isAuthPage) {
      // If coming from the same domain and not from another auth page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(-1);
    } else {
      // Otherwise go to home with smooth scroll
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate('/'), 100); // Small delay for smooth transition
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-gray-900">
        <div className="relative text-center">
          <button 
            onClick={handleBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Go back"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your details to create an account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 ${errors.name ? 'border-destructive' : ''}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 ${errors.email ? 'border-destructive' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 ${errors.password ? 'border-destructive' : ''}`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 ${errors.confirmPassword ? 'border-destructive' : ''}`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-destructive">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

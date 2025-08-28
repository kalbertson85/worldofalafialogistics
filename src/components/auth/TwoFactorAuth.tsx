import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface TwoFactorAuthProps {
  email: string;
  onBack: () => void;
}

export function TwoFactorAuth({ email, onBack }: TwoFactorAuthProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { verify2FA } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await verify2FA(code);
      if (!success) {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('2FA verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
        <p className="text-muted-foreground mt-2">
          We've sent a verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-1">
            Verification Code
          </label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="text-center text-lg font-mono tracking-widest"
            disabled={isLoading}
            autoFocus
          />
          {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        </div>

        <div className="grid gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full mt-2"
            onClick={onBack}
            disabled={isLoading}
          >
            Back to Login
          </Button>
        </div>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        <p>Didn't receive a code? <button type="button" className="text-primary hover:underline">Resend Code</button></p>
      </div>
    </div>
  );
}

export default TwoFactorAuth;

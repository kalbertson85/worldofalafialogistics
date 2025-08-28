import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface PrivacySettings {
  emailNotifications: boolean;
  marketingEmails: boolean;
  profileVisibility: 'public' | 'private';
  dataSharing: boolean;
  lastUpdated?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  is2FAEnabled?: boolean;
  phoneNumber?: string;
  twoFactorMethod?: 'email' | 'authenticator' | 'sms';
  privacySettings?: PrivacySettings;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  verify2FA: (code: string) => Promise<boolean>;
  setup2FA: (method: 'email' | 'authenticator' | 'sms', phoneNumber?: string) => Promise<{ secret?: string; qrCodeUrl?: string }>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  navigateTo: (path: string) => void;
  updatePrivacySettings: (settings: PrivacySettings) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  is2FAPending: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextActions {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  navigateTo: (path: string) => void;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [is2FAPending, setIs2FAPending] = useState(false);
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Update privacy settings
  const updatePrivacySettings = useCallback(async (settings: PrivacySettings) => {
    try {
      // In a real app, this would be an API call to update the user's privacy settings
      const updatedUser = user ? {
        ...user,
        privacySettings: {
          ...settings,
          lastUpdated: new Date().toISOString(),
        },
      } : null;

      // Update user in state
      setUser(updatedUser);
      
      // In a real app, you would also update the backend
      // await api.updateUserPrivacySettings(settings);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
      return Promise.reject(error);
    }
  }, [user]);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // In a real app, verify token with backend
          // const userData = await verifyToken(storedToken);
          // setUser(userData);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const navigateTo = useCallback((path: string) => {
    window.location.href = path;
  }, []);

  const verify2FA = async (code: string): Promise<boolean> => {
    if (!tempToken) return false;
    
    try {
      // In a real app, verify the 2FA code with the server
      // const response = await fetch('/api/auth/verify-2fa', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: tempToken, code })
      // });
      // const data = await response.json();
      
      // Mock verification (always accept '123456' for testing)
      if (code !== '123456') {
        setError('Invalid verification code');
        return false;
      }
      
      setUser(prev => ({
        ...prev!,
        is2FAEnabled: true
      }));
      
      setToken(tempToken);
      localStorage.setItem('token', tempToken);
      setIs2FAPending(false);
      setTempToken(null);
      
      toast({
        title: 'Verification successful',
        description: 'You are now logged in.',
      });
      
      return true;
    } catch (error) {
      console.error('2FA verification failed:', error);
      setError('Failed to verify code. Please try again.');
      return false;
    }
  };
  
  const setup2FA = async (method: 'email' | 'authenticator' | 'sms', phoneNumber?: string) => {
    try {
      // In a real app, this would call your backend to set up 2FA
      // const response = await fetch('/api/auth/setup-2fa', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ method, phoneNumber })
      // });
      // const data = await response.json();
      
      // Mock response
      return {
        secret: 'MOCK_SECRET_KEY',
        qrCodeUrl: 'data:image/png;base64,MOCK_QR_CODE'
      };
    } catch (error) {
      console.error('Failed to set up 2FA:', error);
      throw new Error('Failed to set up 2FA');
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an actual API call:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // Mock response
      const mockUser = {
        id: 'user-123',
        email,
        name: email.split('@')[0],
        role: 'customer',
        is2FAEnabled: true, // Mock 2FA enabled
        twoFactorMethod: 'email' // Mock 2FA method
      };
      
      const mockToken = 'mock-jwt-token';
      
      // If 2FA is enabled, store temp token and wait for verification
      if (mockUser.is2FAEnabled) {
        setTempToken(mockToken);
        setIs2FAPending(true);
        setIsLoading(false);
        return;
      }
      
      // If no 2FA, complete login
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      
      navigateTo('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an actual API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();
      
      // Mock response
      const mockUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        role: 'customer'
      };
      
      const mockToken = 'mock-jwt-token' + Math.random().toString(36).substr(2, 9);
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created!',
      });
      
      navigateTo('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
      toast({
        title: 'Registration failed',
        description: 'There was an error creating your account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setTempToken(null);
    setIs2FAPending(false);
    localStorage.removeItem('token');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigateTo('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        verify2FA,
        setup2FA,
        register,
        logout,
        navigateTo,
        updatePrivacySettings,
        isAuthenticated: !!user,
        isLoading,
        is2FAPending,
        error,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

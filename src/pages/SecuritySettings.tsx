import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Shield, Mail, Smartphone, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SecuritySettings() {
  const navigate = useNavigate();
  const { user, setup2FA, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState<'email' | 'authenticator' | 'sms' | null>(null);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Load user's current 2FA settings
  useEffect(() => {
    if (user) {
      setTwoFactorMethod(user.twoFactorMethod || null);
    }
  }, [user]);

  const handleEnable2FA = async (method: 'email' | 'authenticator' | 'sms') => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (method === 'sms' && !phoneNumber) {
        toast({
          title: 'Phone number required',
          description: 'Please enter a valid phone number for SMS verification',
          variant: 'destructive',
        });
        return;
      }

      const result = await setup2FA(method, phoneNumber || undefined);
      
      if (method === 'authenticator' && result.qrCodeUrl) {
        setQrCodeUrl(result.qrCodeUrl);
      }
      
      // Generate backup codes (in a real app, this would come from the server)
      const codes = Array.from({ length: 10 }, () => 
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      setBackupCodes(codes);
      
      setTwoFactorMethod(method);
      setShow2FASetup(true);
      
      toast({
        title: '2FA enabled successfully',
        description: `Two-factor authentication has been enabled using ${method}.`,
      });
    } catch (error) {
      console.error('Failed to enable 2FA:', error);
      toast({
        title: 'Error',
        description: 'Failed to set up two-factor authentication. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would call your backend to disable 2FA
      // await fetch('/api/auth/disable-2fa', { method: 'POST' });
      
      setTwoFactorMethod(null);
      setShow2FASetup(false);
      
      toast({
        title: '2FA disabled',
        description: 'Two-factor authentication has been disabled for your account.',
      });
    } catch (error) {
      console.error('Failed to disable 2FA:', error);
      toast({
        title: 'Error',
        description: 'Failed to disable two-factor authentication. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const TwoFactorMethodCard = ({
    title,
    description,
    icon: Icon,
    method,
    recommended = false,
  }: {
    title: string;
    description: string;
    icon: React.ElementType;
    method: 'email' | 'authenticator' | 'sms';
    recommended?: boolean;
  }) => (
    <Card className="relative overflow-hidden">
      {recommended && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          Recommended
        </div>
      )}
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        {twoFactorMethod === method ? (
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Active</span>
          </div>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => handleEnable2FA(method)}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Enable {method === 'authenticator' ? 'Authenticator' : method.toUpperCase()}
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto py-6 px-4 sm:py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center px-2 sm:px-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        <span className="text-sm sm:text-base">Back</span>
      </Button>

      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Security Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Manage your account security and two-factor authentication settings
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="pb-3 bg-muted/20">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg sm:text-xl">Two-Factor Authentication</CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <Label htmlFor="email-2fa" className="font-medium text-sm sm:text-base">
                      Email Authentication
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Receive a verification code via email
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end sm:justify-normal space-x-3">
                  {twoFactorMethod === 'email' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEnable2FA('email')}
                      disabled={isLoading}
                      className="w-full sm:w-auto"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Setting up...
                        </>
                      ) : 'Enable'}
                    </Button>
                  )}
                </div>
              </div>

              {!twoFactorMethod ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <TwoFactorMethodCard
                    title="Authenticator App"
                    description="Use an app like Google Authenticator or Authy to generate verification codes."
                    icon={KeyRound}
                    method="authenticator"
                    recommended
                  />
                  <TwoFactorMethodCard
                    title="Email"
                    description="Receive verification codes via email."
                    icon={Mail}
                    method="email"
                  />
                  <TwoFactorMethodCard
                    title="SMS"
                    description="Receive verification codes via text message."
                    icon={Smartphone}
                    method="sms"
                  />
                </div>
              ) : (
                <div className="mt-4 rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="rounded-full bg-green-100 p-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">
                        {twoFactorMethod === 'authenticator' && 'Authenticator App'}
                        {twoFactorMethod === 'email' && 'Email Authentication'}
                        {twoFactorMethod === 'sms' && 'SMS Authentication'}
                      </h3>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {twoFactorMethod === 'authenticator' && 'Set up using an authenticator app'}
                        {twoFactorMethod === 'email' && `Codes will be sent to ${user?.email}`}
                        {twoFactorMethod === 'sms' && 'Codes will be sent to your phone'}
                      </div>
                      {backupCodes.length > 0 && (
                        <div className="mt-6 p-4 border border-dashed border-amber-200 bg-amber-50 rounded-lg">
                          <div className="flex items-start space-x-3 mb-4">
                            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-amber-800 text-sm sm:text-base">Backup Codes</h3>
                              <p className="text-xs sm:text-sm text-amber-700 mt-1">
                                Save these backup codes in a secure place. You can use them to access your account if you lose access to your authenticator app.
                              </p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                              {backupCodes.map((code, index) => (
                                <div key={index} className="font-mono text-xs sm:text-sm bg-white p-2 rounded border text-center truncate">
                                  {code}
                                </div>
                              ))}
                            </div>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                              Download Backup Codes
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:items-center">
              <div>
                <h3 className="font-medium">Sign out of all devices</h3>
                <p className="text-sm text-muted-foreground">
                  This will log you out of all devices except this one.
                </p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                Sign out everywhere
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:items-center">
              <div>
                <h3 className="font-medium">Delete account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <Button variant="destructive" className="w-full sm:w-auto">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

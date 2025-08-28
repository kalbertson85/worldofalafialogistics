import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Bell, User, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function PrivacySettings() {
  const { user, updatePrivacySettings } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize privacy settings from user data or use defaults
  const [privacySettings, setPrivacySettings] = useState({
    emailNotifications: true,
    marketingEmails: true,
    profileVisibility: 'private' as const,
    dataSharing: false,
    ...user?.privacySettings,
  });

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API to update the settings
      await updatePrivacySettings(privacySettings);
      
      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update privacy settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrivacySettings({
      emailNotifications: true,
      marketingEmails: true,
      profileVisibility: 'private',
      dataSharing: false,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="grid gap-4 sm:gap-6">
          <Card className="overflow-hidden">
          <CardHeader className="pb-3 bg-muted/20">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg sm:text-xl">Email Preferences</CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Control how we communicate with you via email
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 divide-y">
            <div className="flex flex-col p-4 space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:p-6">
              <div className="space-y-1">
                <Label htmlFor="email-notifications" className="text-sm sm:text-base">
                  Email Notifications
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Receive important account notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={privacySettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setPrivacySettings({ ...privacySettings, emailNotifications: checked })
                }
                className="mt-1 sm:mt-0"
              />
            </div>
            <div className="flex flex-col p-4 space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:p-6">
              <div className="space-y-1">
                <Label htmlFor="marketing-emails" className="text-sm sm:text-base">
                  Marketing Emails
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Receive promotional offers and updates
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={privacySettings.marketingEmails}
                onCheckedChange={(checked) =>
                  setPrivacySettings({ ...privacySettings, marketingEmails: checked })
                }
                className="mt-1 sm:mt-0"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-3 bg-muted/20">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg sm:text-xl">Profile Visibility</CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Control who can see your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-4 sm:p-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="radio"
                      id="profile-public"
                      name="profile-visibility"
                      className="h-4 w-4 border-muted-foreground text-primary focus:ring-primary"
                      checked={privacySettings.profileVisibility === 'public'}
                      onChange={() =>
                        setPrivacySettings({ ...privacySettings, profileVisibility: 'public' })
                      }
                    />
                  </div>
                  <Label htmlFor="profile-public" className="flex flex-col space-y-1">
                    <span className="text-sm sm:text-base">Public</span>
                    <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                      Anyone can see your profile
                    </span>
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="radio"
                      id="profile-private"
                      name="profile-visibility"
                      className="h-4 w-4 border-muted-foreground text-primary focus:ring-primary"
                      checked={privacySettings.profileVisibility === 'private'}
                      onChange={() =>
                        setPrivacySettings({ ...privacySettings, profileVisibility: 'private' })
                      }
                    />
                  </div>
                  <Label htmlFor="profile-private" className="flex flex-col space-y-1">
                    <span className="text-sm sm:text-base">Private</span>
                    <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                      Only you can see your profile
                    </span>
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-destructive/50">
          <CardHeader className="pb-3 bg-muted/20">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg sm:text-xl">Data & Privacy</CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Manage your data and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 space-y-6 sm:p-6">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Label htmlFor="data-sharing" className="text-sm sm:text-base text-destructive">
                      Data Sharing with Third Parties
                    </Label>
                    <span className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                      Not Recommended
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Allow us to share your data with trusted third-party partners to enhance your experience.
                    This may include analytics and marketing services.
                  </p>
                </div>
                <div className="flex-shrink-0 pt-1 sm:pt-0">
                  <Switch
                    id="data-sharing"
                    checked={privacySettings.dataSharing}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, dataSharing: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 text-sm font-medium sm:text-base">Download Your Data</h4>
                  <p className="mb-4 text-xs sm:text-sm text-muted-foreground">
                    Request a copy of all the personal data we have about you.
                  </p>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Request Data Download
                  </Button>
                </div>

                <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-destructive sm:text-base">
                        Delete Account
                      </h4>
                      <p className="mb-3 text-xs sm:text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                        Delete My Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <Button 
          variant="outline" 
          onClick={handleReset} 
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          Reset to Defaults
        </Button>
        <Button 
          onClick={handleSaveChanges} 
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

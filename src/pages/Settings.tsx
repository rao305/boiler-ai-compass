import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Key, 
  Bell, 
  Shield, 
  Download, 
  Trash2,
  Save,
  Eye,
  EyeOff
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  year: string;
  studentId: string;
  expectedGraduation: string;
}

export default function Settings() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@purdue.edu",
    major: "Computer Science",
    year: "Junior",
    studentId: "0031234567",
    expectedGraduation: "May 2026"
  });

  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseReminders: true,
    gradingUpdates: false,
    registrationAlerts: true,
    degreeProgressUpdates: true
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: false,
    allowAnalytics: true,
    publicProfile: false
  });

  const handleProfileUpdate = () => {
    // Handle profile update
    console.log("Profile updated:", profile);
  };

  const handleApiKeyUpdate = () => {
    // Handle API key update
    console.log("API key updated");
  };

  const handleDataExport = () => {
    // Handle data export
    console.log("Exporting user data...");
  };

  const handleAccountDeletion = () => {
    // Handle account deletion
    console.log("Account deletion requested");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Information */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-md bg-muted p-2">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={profile.studentId}
                  onChange={(e) => setProfile(prev => ({ ...prev, studentId: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  value={profile.major}
                  onChange={(e) => setProfile(prev => ({ ...prev, major: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="year">Academic Year</Label>
                <Input
                  id="year"
                  value={profile.year}
                  onChange={(e) => setProfile(prev => ({ ...prev, year: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleProfileUpdate} className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </Card>

          {/* API Configuration */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-md bg-muted p-2">
                <Key className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">AI Assistant Configuration</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="apiKey">OpenAI API Key (Optional)</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add your own API key for enhanced AI features and unlimited usage
                </p>
                <div className="relative">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Benefits of adding your API key:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Unlimited AI assistant conversations</li>
                  <li>• Advanced course recommendation algorithms</li>
                  <li>• Personalized academic planning insights</li>
                  <li>• Priority processing for complex queries</li>
                </ul>
              </div>

              <Button onClick={handleApiKeyUpdate} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save API Key
              </Button>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-md bg-muted p-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="courseReminders">Course Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminded about assignments and deadlines</p>
                </div>
                <Switch
                  id="courseReminders"
                  checked={notifications.courseReminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, courseReminders: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="gradingUpdates">Grading Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications when grades are posted</p>
                </div>
                <Switch
                  id="gradingUpdates"
                  checked={notifications.gradingUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, gradingUpdates: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="registrationAlerts">Registration Alerts</Label>
                  <p className="text-sm text-muted-foreground">Course registration and waitlist updates</p>
                </div>
                <Switch
                  id="registrationAlerts"
                  checked={notifications.registrationAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, registrationAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="degreeProgressUpdates">Degree Progress Updates</Label>
                  <p className="text-sm text-muted-foreground">Milestone achievements and requirements</p>
                </div>
                <Switch
                  id="degreeProgressUpdates"
                  checked={notifications.degreeProgressUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, degreeProgressUpdates: checked }))
                  }
                />
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-md bg-muted p-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="shareProgress">Share Progress</Label>
                  <p className="text-sm text-muted-foreground">Allow others to see your academic progress</p>
                </div>
                <Switch
                  id="shareProgress"
                  checked={privacy.shareProgress}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, shareProgress: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowAnalytics">Usage Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve the platform with anonymous usage data</p>
                </div>
                <Switch
                  id="allowAnalytics"
                  checked={privacy.allowAnalytics}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, allowAnalytics: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicProfile">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Make your profile discoverable by other students</p>
                </div>
                <Switch
                  id="publicProfile"
                  checked={privacy.publicProfile}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, publicProfile: checked }))
                  }
                />
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-md bg-muted p-2">
                <Download className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Data Management</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Export Your Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download a copy of all your academic data including transcripts, plans, and progress
                </p>
                <Button onClick={handleDataExport} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="font-medium text-foreground mb-2">Delete Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button onClick={handleAccountDeletion} variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
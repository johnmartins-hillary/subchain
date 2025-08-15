import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

export function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    weeklyReports: true,
  });

  const handleProfileSave = () => {
    toast.success("Profile updated successfully!");
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    toast.success("Preference updated");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-medium mb-6">Settings</h1>

        {/* Profile Settings */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Profile Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, firstName: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
          </div>

          <Button
            onClick={handleProfileSave}
            className="bg-[#FFC404] hover:bg-yellow-500 text-black"
          >
            Save Profile
          </Button>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">
                  Receive updates about your funded communities
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("emailNotifications", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <p className="text-sm text-gray-600">
                  Get text messages for urgent updates
                </p>
              </div>
              <Switch
                id="smsNotifications"
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("smsNotifications", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <p className="text-sm text-gray-600">
                  Receive information about new opportunities
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("marketingEmails", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weeklyReports">Weekly Reports</Label>
                <p className="text-sm text-gray-600">
                  Get weekly summaries of your impact
                </p>
              </div>
              <Switch
                id="weeklyReports"
                checked={preferences.weeklyReports}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("weeklyReports", checked)
                }
              />
            </div>
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Account Actions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Change Password</h3>
              <p className="text-sm text-gray-600 mb-3">
                Update your account password for better security
              </p>
              <Button variant="outline">Change Password</Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-3">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  Shield,
  CreditCard,
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Full-stack developer and blockchain enthusiast',
    website: 'https://johndoe.dev',
    avatar: '/api/placeholder/100/100'
  });

  const [notifications, setNotifications] = useState({
    subscriptionUpdates: true,
    paymentAlerts: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const walletInfo = {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    balance: '125.48 SUI',
    connected: true,
    network: 'Sui Mainnet'
  };

  const transactionHistory = [
    {
      id: '1',
      type: 'subscription',
      description: 'Premium API Access subscription',
      amount: '-0.5 SUI',
      date: '2024-01-15',
      status: 'completed',
      txHash: '0x1234...5678'
    },
    {
      id: '2',
      type: 'withdrawal',
      description: 'Creator earnings withdrawal',
      amount: '+25.0 SUI',
      date: '2024-01-14',
      status: 'completed',
      txHash: '0x2345...6789'
    },
    {
      id: '3',
      type: 'subscription',
      description: 'NFT Analytics Pro subscription',
      amount: '-1.2 SUI',
      date: '2024-01-12',
      status: 'completed',
      txHash: '0x3456...7890'
    },
    {
      id: '4',
      type: 'refund',
      description: 'Cancelled subscription refund',
      amount: '+0.8 SUI',
      date: '2024-01-10',
      status: 'pending',
      txHash: null
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletInfo.address);
  };

  const handleDisconnectWallet = () => {
    // Disconnect wallet logic here
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Profile & Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and wallet connection
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Profile Information</h3>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-lg">{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={profile.website}
                  onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <div className="space-y-6">
            {/* Wallet Status */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Wallet Connection</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${walletInfo.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <div className="font-medium">
                        {walletInfo.connected ? 'Connected' : 'Disconnected'}
                      </div>
                      <div className="text-sm text-muted-foreground">{walletInfo.network}</div>
                    </div>
                  </div>
                  <Button 
                    variant={walletInfo.connected ? "destructive" : "default"}
                    onClick={handleDisconnectWallet}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {walletInfo.connected ? 'Disconnect' : 'Connect Wallet'}
                  </Button>
                </div>

                {walletInfo.connected && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Wallet Address</span>
                      <Button variant="ghost" size="sm" onClick={handleCopyAddress}>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono break-all">
                      {walletInfo.address}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Balance */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Wallet Balance</h3>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-3xl font-bold text-primary mb-2">{walletInfo.balance}</div>
                  <div className="text-sm text-muted-foreground">Available Balance</div>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Add Funds
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Recent Transactions</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${
                          tx.status === 'completed' ? 'bg-green-500' : 
                          tx.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="font-medium capitalize">{tx.type}</div>
                          <div className="text-sm text-muted-foreground">{tx.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`font-semibold ${
                          tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.amount}
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          {tx.status === 'completed' ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-yellow-500" />
                          )}
                          <span className="capitalize">{tx.status}</span>
                        </div>
                      </div>

                      {tx.txHash && (
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Notification Preferences</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Subscription Updates</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when your subscriptions are renewed or cancelled
                  </div>
                </div>
                <Switch
                  checked={notifications.subscriptionUpdates}
                  onCheckedChange={(checked) => updateNotificationSetting('subscriptionUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Payment Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Receive alerts for successful and failed payments
                  </div>
                </div>
                <Switch
                  checked={notifications.paymentAlerts}
                  onCheckedChange={(checked) => updateNotificationSetting('paymentAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Marketing Emails</div>
                  <div className="text-sm text-muted-foreground">
                    Get updates about new features and promotions
                  </div>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => updateNotificationSetting('marketingEmails', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Security Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Important security notifications and login alerts
                  </div>
                </div>
                <Switch
                  checked={notifications.securityAlerts}
                  onCheckedChange={(checked) => updateNotificationSetting('securityAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Security Settings</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <Badge variant="outline">Not Enabled</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Account Recovery</div>
                    <div className="text-sm text-muted-foreground">
                      Set up recovery options for your account
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Active Sessions</div>
                    <div className="text-sm text-muted-foreground">
                      Manage your active login sessions
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Sessions</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Data & Privacy</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
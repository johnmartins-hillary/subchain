import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Plus, 
  Edit,
  Eye,
  MoreHorizontal,
} from 'lucide-react';

export default function CreatorDashboard() {
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    price: '',
    period: 'month',
    category: '',
    features: ['']
  });

  const creatorStats = {
    totalRevenue: 1250.5,
    totalSubscribers: 3420,
    activePlans: 6,
    monthlyGrowth: 15.2
  };

  const plans = [
    {
      id: '1',
      name: 'Premium API Access',
      description: 'High-performance API with advanced features',
      price: '0.5 SUI',
      period: 'month',
      category: 'Developer Tools',
      subscribers: 1250,
      revenue: 625,
      status: 'active',
      created: '2023-08-15'
    },
    {
      id: '2',
      name: 'Basic API Access',
      description: 'Standard API access for small projects',
      price: '0.2 SUI',
      period: 'month',
      category: 'Developer Tools',
      subscribers: 820,
      revenue: 164,
      status: 'active',
      created: '2023-09-01'
    },
    {
      id: '3',
      name: 'Enterprise Suite',
      description: 'Full enterprise solution with premium support',
      price: '2.0 SUI',
      period: 'month',
      category: 'Developer Tools',
      subscribers: 45,
      revenue: 90,
      status: 'active',
      created: '2023-10-10'
    }
  ];

  const recentActivity = [
    { type: 'subscription', user: 'DevUser123', plan: 'Premium API Access', time: '2 hours ago' },
    { type: 'cancellation', user: 'StartupFounder', plan: 'Basic API Access', time: '4 hours ago' },
    { type: 'subscription', user: 'TechLead456', plan: 'Enterprise Suite', time: '6 hours ago' },
    { type: 'renewal', user: 'AppBuilder', plan: 'Premium API Access', time: '1 day ago' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 840, subscribers: 2100 },
    { month: 'Feb', revenue: 1250, subscribers: 3420 },
    { month: 'Mar', revenue: 980, subscribers: 2890 },
    { month: 'Apr', revenue: 1450, subscribers: 4200 },
    { month: 'May', revenue: 1680, subscribers: 4850 },
    { month: 'Jun', revenue: 1250, subscribers: 3420 }
  ];

  const addFeature = () => {
    setNewPlan(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setNewPlan(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index: number) => {
    if (newPlan.features.length > 1) {
      setNewPlan(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  const handleCreatePlan = () => {
    console.log('Creating plan:', newPlan);
    setIsCreatePlanOpen(false);
    setNewPlan({
      name: '',
      description: '',
      price: '',
      period: 'month',
      category: '',
      features: ['']
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and track your earnings
          </p>
        </div>
        <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Subscription Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Premium API Access"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newPlan.category} onValueChange={(value) => setNewPlan(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Developer Tools">Developer Tools</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Content">Content</SelectItem>
                      <SelectItem value="SaaS">SaaS</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what your plan offers..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (SUI)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.1"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.5"
                  />
                </div>
                <div>
                  <Label htmlFor="period">Billing Period</Label>
                  <Select value={newPlan.period} onValueChange={(value) => setNewPlan(prev => ({ ...prev, period: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Weekly</SelectItem>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="quarter">Quarterly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Features Included</Label>
                <div className="space-y-2 mt-2">
                  {newPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Enter a feature..."
                      />
                      {newPlan.features.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                    <Plus className="w-3 h-3 mr-1" />
                    Add Feature
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreatePlanOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePlan}>
                  Create Plan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {creatorStats.totalRevenue} SUI
            </div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-xs text-green-600 mt-1">+{creatorStats.monthlyGrowth}% this month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {creatorStats.totalSubscribers.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Subscribers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {creatorStats.activePlans}
            </div>
            <div className="text-sm text-muted-foreground">Active Plans</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {(creatorStats.totalRevenue / creatorStats.totalSubscribers).toFixed(2)} SUI
            </div>
            <div className="text-sm text-muted-foreground">Avg Revenue per User</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plans">My Plans</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="space-y-4">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {plan.category}
                          </Badge>
                          <Badge className="text-xs bg-green-100 text-green-800">
                            {plan.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="font-semibold">{plan.price}/{plan.period}</div>
                        <div className="text-xs text-muted-foreground">Price</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-semibold">{plan.subscribers}</div>
                        <div className="text-xs text-muted-foreground">Subscribers</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-semibold">{plan.revenue} SUI</div>
                        <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Revenue Over Time</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.slice(-6).map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{data.month}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">{data.revenue} SUI</span>
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(data.revenue / 2000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Subscriber Growth</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.slice(-6).map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{data.month}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">{data.subscribers}</span>
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(data.subscribers / 5000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <h3 className="font-semibold">Plan Performance</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.category}</div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="font-semibold">{plan.subscribers}</div>
                          <div className="text-xs text-muted-foreground">Subscribers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{plan.revenue} SUI</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{((plan.revenue / plan.subscribers) || 0).toFixed(2)} SUI</div>
                          <div className="text-xs text-muted-foreground">ARPU</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Recent Activity</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'subscription' ? 'bg-green-500' :
                      activity.type === 'renewal' ? 'bg-blue-500' :
                      'bg-red-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {activity.type === 'subscription' && ' subscribed to '}
                        {activity.type === 'cancellation' && ' cancelled '}
                        {activity.type === 'renewal' && ' renewed '}
                        <span className="font-medium">{activity.plan}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Settings,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  X,
} from "lucide-react";

export default function SubscriberDashboard() {
  const activeSubscriptions = [
    {
      id: "1",
      name: "Premium API Access",
      creator: "TechCorp",
      avatar: "/api/placeholder/32/32",
      price: "0.5 SUI",
      period: "month",
      status: "active",
      nextBilling: "2024-02-15",
      renewalCount: 6,
      category: "Developer Tools",
    },
    {
      id: "2",
      name: "NFT Analytics Pro",
      creator: "DataLabs",
      avatar: "/api/placeholder/32/32",
      price: "1.2 SUI",
      period: "month",
      status: "active",
      nextBilling: "2024-02-18",
      renewalCount: 3,
      category: "Analytics",
    },
    {
      id: "3",
      name: "Learn Web3 Premium",
      creator: "Web3Academy",
      avatar: "/api/placeholder/32/32",
      price: "1.8 SUI",
      period: "month",
      status: "expiring",
      nextBilling: "2024-02-12",
      renewalCount: 1,
      category: "Education",
    },
  ];

  const paymentHistory = [
    {
      id: "1",
      subscription: "Premium API Access",
      amount: "0.5 SUI",
      date: "2024-01-15",
      status: "completed",
      txHash: "0x1234...5678",
    },
    {
      id: "2",
      subscription: "NFT Analytics Pro",
      amount: "1.2 SUI",
      date: "2024-01-18",
      status: "completed",
      txHash: "0x2345...6789",
    },
    {
      id: "3",
      subscription: "Learn Web3 Premium",
      amount: "1.8 SUI",
      date: "2024-01-12",
      status: "completed",
      txHash: "0x3456...7890",
    },
    {
      id: "4",
      subscription: "Premium API Access",
      amount: "0.5 SUI",
      date: "2024-01-15",
      status: "failed",
      txHash: null,
    },
  ];

  const upcomingPayments = [
    {
      subscription: "Learn Web3 Premium",
      amount: "1.8 SUI",
      date: "2024-02-12",
      daysUntil: 2,
    },
    {
      subscription: "Premium API Access",
      amount: "0.5 SUI",
      date: "2024-02-15",
      daysUntil: 5,
    },
    {
      subscription: "NFT Analytics Pro",
      amount: "1.2 SUI",
      date: "2024-02-18",
      daysUntil: 8,
    },
  ];

  const handleCancelSubscription = (subscriptionId: string) => {
    // Mock cancellation
    console.log("Cancelling subscription:", subscriptionId);
  };

  const handleRenewSubscription = (subscriptionId: string) => {
    // Mock renewal
    console.log("Renewing subscription:", subscriptionId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expiring":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalMonthlySpend = activeSubscriptions
    .filter((sub) => sub.status === "active")
    .reduce((total, sub) => total + parseFloat(sub.price), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Subscription Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your active subscriptions and payment history
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {
                activeSubscriptions.filter((sub) => sub.status === "active")
                  .length
              }
            </div>
            <div className="text-sm text-muted-foreground">
              Active Subscriptions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {totalMonthlySpend.toFixed(1)} SUI
            </div>
            <div className="text-sm text-muted-foreground">Monthly Spend</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {upcomingPayments.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Upcoming Payments
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {activeSubscriptions.reduce(
                (total, sub) => total + sub.renewalCount,
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Total Renewals</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <div className="space-y-4">
            {activeSubscriptions.map((subscription) => (
              <Card key={subscription.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={subscription.avatar} />
                        <AvatarFallback>
                          {subscription.creator.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{subscription.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {subscription.creator}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {subscription.category}
                          </Badge>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              subscription.status
                            )}`}
                          >
                            {subscription.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">
                        {subscription.price}/{subscription.period}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Next:{" "}
                        {new Date(
                          subscription.nextBilling
                        ).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {subscription.renewalCount} renewals
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-3 h-3 mr-1" />
                        Manage
                      </Button>
                      {subscription.status === "expiring" ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleRenewSubscription(subscription.id)
                          }
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Renew
                        </Button>
                      ) : (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleCancelSubscription(subscription.id)
                          }
                        >
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Upcoming Payments</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          payment.daysUntil <= 3
                            ? "bg-red-500"
                            : payment.daysUntil <= 7
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium">
                          {payment.subscription}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(payment.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{payment.amount}</div>
                      <div className="text-sm text-muted-foreground">
                        in {payment.daysUntil} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Payment History</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          payment.status === "completed"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium">
                          {payment.subscription}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(payment.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">{payment.amount}</div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {payment.status === "completed" ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-red-500" />
                        )}
                        <span className="capitalize">{payment.status}</span>
                      </div>
                    </div>

                    {payment.txHash && (
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        View Tx
                      </Button>
                    )}
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  ArrowLeft,
  Star,
  Users,
  Calendar,
  Shield,
  Check,
  ExternalLink,
  TrendingUp,
  Clock,
  Globe,
} from "lucide-react";

export default function PlanDetails() {
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Mock plan data - in real app this would be fetched based on ID
  const plan = {
    id: "1",
    name: "Premium API Access",
    description:
      "High-performance API with advanced analytics, priority support, and custom webhooks for modern applications.",
    longDescription:
      "Our Premium API Access plan provides enterprise-grade infrastructure with guaranteed 99.9% uptime, advanced rate limiting, comprehensive analytics dashboard, and dedicated support. Perfect for startups and established businesses looking to scale their applications.",
    price: "0.5 SUI",
    period: "month",
    category: "Developer Tools",
    creator: {
      name: "TechCorp",
      avatar: "/api/placeholder/64/64",
      reputation: 4.8,
      verified: true,
      joinedDate: "2023-06-15",
      totalSubscribers: 3250,
      description:
        "Leading provider of developer infrastructure and API services.",
    },
    subscriberCount: 1250,
    rating: 4.7,
    reviewCount: 89,
    features: [
      "10,000 API requests per month",
      "99.9% uptime guarantee",
      "Priority support response",
      "Advanced analytics dashboard",
      "Custom webhook integrations",
      "Rate limiting protection",
      "Multiple environment support",
      "SSL certificate included",
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "0.3 SUI",
        requests: "5,000",
        support: "Community",
      },
      {
        name: "Premium",
        price: "0.5 SUI",
        requests: "10,000",
        support: "Priority",
        current: true,
      },
      {
        name: "Enterprise",
        price: "1.5 SUI",
        requests: "Unlimited",
        support: "Dedicated",
      },
    ],
    tags: ["API", "Infrastructure", "Analytics", "Enterprise"],
    metrics: {
      uptime: 99.9,
      responseTime: 125,
      satisfaction: 4.7,
    },
  };

  const reviews = [
    {
      id: 1,
      user: "DevMaster",
      avatar: "/api/placeholder/32/32",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent API service with great documentation and support. The analytics dashboard is particularly useful.",
    },
    {
      id: 2,
      user: "StartupFounder",
      avatar: "/api/placeholder/32/32",
      rating: 4,
      date: "2024-01-12",
      comment:
        "Reliable service that helped us scale quickly. Minor issues with webhook delivery but support was quick to help.",
    },
    {
      id: 3,
      user: "TechLead",
      avatar: "/api/placeholder/32/32",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Been using this for 6 months. Great uptime and the rate limiting features saved us from several incidents.",
    },
  ];

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    // Mock subscription process
    setTimeout(() => {
      setIsSubscribing(false);
      // In real app, would redirect to payment or show success
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/plans">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plans
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Plan Header */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">{plan.category}</Badge>
              {plan.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold mb-4">{plan.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {plan.description}
            </p>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {plan.rating} ({plan.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{plan.subscriberCount} subscribers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Monthly billing</span>
              </div>
            </div>
          </div>

          {/* Creator Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={plan.creator.avatar} />
                  <AvatarFallback>{plan.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{plan.creator.name}</h3>
                    {plan.creator.verified && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      {plan.creator.reputation} rating
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {plan.creator.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>
                      {plan.creator.totalSubscribers} total subscribers
                    </span>
                    <span>
                      Joined{" "}
                      {new Date(plan.creator.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">About This Plan</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {plan.longDescription}
                  </p>

                  <h4 className="font-medium mb-4">What's Included</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Service Metrics</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Uptime</span>
                      <span className="text-sm font-medium">
                        {plan.metrics.uptime}%
                      </span>
                    </div>
                    <Progress value={plan.metrics.uptime} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {plan.metrics.responseTime}ms
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg Response Time
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {plan.metrics.satisfaction}/5
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Customer Satisfaction
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Pricing Tiers</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plan.pricingTiers.map((tier, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg ${
                          tier.current
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{tier.name}</h4>
                              {tier.current && <Badge>Current</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {tier.requests} requests • {tier.support} support
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{tier.price}</div>
                            <div className="text-xs text-muted-foreground">
                              per month
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>
                            {review.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{review.user}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Subscription Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2">{plan.price}</div>
                <div className="text-sm text-muted-foreground">
                  per {plan.period}
                </div>
              </div>

              <Button
                className="w-full mb-4"
                size="lg"
                onClick={handleSubscribe}
                disabled={isSubscribing}
              >
                {isSubscribing ? "Processing..." : "Subscribe Now"}
              </Button>

              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>• Cancel anytime with one click</p>
                <p>• Automatic renewal via smart contract</p>
                <p>• Transparent on-chain payments</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Quick Stats</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Growth</span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  +15% this month
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Avg Response</span>
                </div>
                <span className="text-sm font-medium">2.5 hours</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Global Users</span>
                </div>
                <span className="text-sm font-medium">45+ countries</span>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact the creator directly for support
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-3 h-3 mr-2" />
                Get Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

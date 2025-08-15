import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import PlanCard from "../PlanCard";
import {
  ArrowRight,
  Zap,
  Globe,
  DollarSign,
  Clock,
  BarChart3,
  RefreshCw,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  const liveStats = {
    totalSubscriptions: 15420,
    totalEarnings: 284500,
    activePlans: 1247,
    globalUsers: 45600,
  };

  const featuredPlans = [
    {
      id: "1",
      name: "Premium API Access",
      description:
        "High-performance API with 10,000 requests/month and priority support.",
      price: "0.5 SUI",
      period: "month",
      category: "Developer Tools",
      creator: {
        name: "TechCorp",
        avatar: "/api/placeholder/32/32",
        reputation: 4.8,
      },
      subscriberCount: 1250,
      rating: 4.7,
      reviewCount: 89,
    },
    {
      id: "2",
      name: "NFT Analytics Pro",
      description: "Advanced NFT market analytics and trend prediction tools.",
      price: "1.2 SUI",
      period: "month",
      category: "Analytics",
      creator: {
        name: "DataLabs",
        avatar: "/api/placeholder/32/32",
        reputation: 4.9,
      },
      subscriberCount: 820,
      rating: 4.8,
      reviewCount: 156,
    },
    {
      id: "3",
      name: "Creative Content Hub",
      description:
        "Exclusive access to premium design resources and templates.",
      price: "0.8 SUI",
      period: "month",
      category: "Content",
      creator: {
        name: "DesignStudio",
        avatar: "/api/placeholder/32/32",
        reputation: 4.6,
      },
      subscriberCount: 2100,
      rating: 4.5,
      reviewCount: 243,
    },
  ];

  const howItWorks = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Create Your Plan",
      description:
        "Set up subscription plans with custom pricing and billing periods in minutes.",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Automated Payments",
      description:
        "Smart contracts handle recurring payments automatically, no manual intervention needed.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track & Earn",
      description:
        "Monitor subscribers and earnings in real-time with transparent on-chain analytics.",
    },
  ];

  const features = [
    {
      icon: <RefreshCw className="w-5 h-5" />,
      text: "Automated Recurring Payments",
    },
    { icon: <Globe className="w-5 h-5" />, text: "Global Access" },
    { icon: <Lock className="w-5 h-5" />, text: "Trustless Smart Contracts" },
    { icon: <DollarSign className="w-5 h-5" />, text: "Low Fees" },
    { icon: <Clock className="w-5 h-5" />, text: "Instant Setup" },
    { icon: <BarChart3 className="w-5 h-5" />, text: "Real-time Analytics" },
  ];

  return (
    <div className="space-y-20 overflow-hidden">
      {/* Hero Section */}
      <section className="pt-10 sm:pt-16 lg:pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Zap className="w-3 h-3" />
              </motion.div>
              Built on Sui Blockchain
            </Badge>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Decentralized Subscription Infrastructure
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The first blockchain-native subscription platform. Create recurring
            revenue models with automatic payments, transparent earnings, and
            zero platform lock-in.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              >
                <Link to="/creator">
                  Create Plan
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="ml-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              >
                <Link to="/plans">Browse Plans</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                custom={index}
              >
                <motion.div
                  className="text-primary mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {feature.icon}
                </motion.div>
                <span className="text-xs text-center font-medium leading-tight">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Platform Statistics
            </h2>
            <p className="text-muted-foreground">
              Real-time metrics from the SubChain network
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                value: liveStats.totalSubscriptions.toLocaleString(),
                label: "Total Subscriptions",
              },
              {
                value: `${liveStats.totalEarnings.toLocaleString()} SUI`,
                label: "Total Earnings",
              },
              {
                value: liveStats.activePlans.toLocaleString(),
                label: "Active Plans",
              },
              {
                value: liveStats.globalUsers.toLocaleString(),
                label: "Global Users",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <motion.div
                      className="text-xl sm:text-2xl font-bold text-primary mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: index * 0.1 + 0.3,
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get started with decentralized subscriptions in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Featured Plans
              </h2>
              <p className="text-muted-foreground">
                Discover popular subscription services
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline">
                <Link to="/plans">View All Plans</Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Join the future of subscription commerce. No fees, no limits, just
              pure decentralized value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/creator">Start Creating</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link to="/plans">Explore Plans</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PlanCard from "../PlanCard";
import { Search, Filter, Grid, List } from "lucide-react";

export default function BrowsePlans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    "All Categories",
    "Developer Tools",
    "Analytics",
    "Content",
    "SaaS",
    "Gaming",
    "Education",
    "DeFi",
    "NFTs",
  ];

  const mockPlans = [
    {
      id: "1",
      name: "Premium API Access",
      description:
        "High-performance API with 10,000 requests/month, advanced analytics, priority support, and custom webhooks.",
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
      description:
        "Advanced NFT market analytics with trend prediction, portfolio tracking, and real-time floor price alerts.",
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
        "Exclusive access to premium design resources, templates, fonts, and weekly design challenges.",
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
    {
      id: "4",
      name: "DeFi Yield Optimizer",
      description:
        "Automated yield farming strategies and portfolio rebalancing for maximum returns.",
      price: "2.0 SUI",
      period: "month",
      category: "DeFi",
      creator: {
        name: "YieldMaster",
        avatar: "/api/placeholder/32/32",
        reputation: 4.7,
      },
      subscriberCount: 680,
      rating: 4.6,
      reviewCount: 127,
    },
    {
      id: "5",
      name: "Gaming Analytics Suite",
      description:
        "Player behavior analytics, monetization insights, and game performance tracking.",
      price: "1.5 SUI",
      period: "month",
      category: "Gaming",
      creator: {
        name: "GameMetrics",
        avatar: "/api/placeholder/32/32",
        reputation: 4.5,
      },
      subscriberCount: 450,
      rating: 4.4,
      reviewCount: 78,
    },
    {
      id: "6",
      name: "Learn Web3 Premium",
      description:
        "Comprehensive Web3 development courses with hands-on projects and mentorship.",
      price: "1.8 SUI",
      period: "month",
      category: "Education",
      creator: {
        name: "Web3Academy",
        avatar: "/api/placeholder/32/32",
        reputation: 4.9,
      },
      subscriberCount: 1850,
      rating: 4.9,
      reviewCount: 312,
    },
  ];

  const filteredPlans = mockPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || plan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPlans = [...filteredPlans].sort((a, b) => {
    switch (selectedSort) {
      case "popular":
        return b.subscriberCount - a.subscriberCount;
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Browse Subscription Plans
        </h1>
        <p className="text-muted-foreground">
          Discover and subscribe to services across the SubChain ecosystem
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search plans, creators, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <div className="flex-1 sm:max-w-48">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category, index) => (
                        <SelectItem
                          key={index}
                          value={index === 0 ? "all" : category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="flex-1 sm:max-w-48">
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-muted rounded-lg p-1 self-start">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="px-3"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="px-3"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Popular Categories */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-medium mb-4">Popular Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.slice(1, 6).map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Badge
                variant={
                  selectedCategory === category ? "default" : "secondary"
                }
                className="cursor-pointer transition-all duration-200"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-muted-foreground">
          {sortedPlans.length} plan{sortedPlans.length !== 1 ? "s" : ""} found
        </p>
        <AnimatePresence>
          {selectedCategory !== "all" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Plans Grid/List */}
      <AnimatePresence mode="wait">
        {sortedPlans.length > 0 ? (
          <motion.div
            key={`${viewMode}-${selectedCategory}-${selectedSort}`}
            className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sortedPlans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-8 sm:p-12 text-center">
                <motion.div
                  className="text-muted-foreground mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No plans found</h3>
                  <p>Try adjusting your search terms or filters</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

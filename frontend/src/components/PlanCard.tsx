import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Users, Star, ArrowRight } from "lucide-react";

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: string;
    period: string;
    category: string;
    creator: {
      name: string;
      avatar?: string;
      reputation: number;
    };
    subscriberCount: number;
    rating: number;
    reviewCount: number;
  };
  showSubscribeButton?: boolean;
  index?: number;
}

export default function PlanCard({
  plan,
  showSubscribeButton = true,
  index = 0,
}: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    {plan.category}
                  </Badge>
                </motion.div>
                <div className="flex items-center space-x-1">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                  <span className="text-xs text-muted-foreground">
                    {plan.rating} ({plan.reviewCount})
                  </span>
                </div>
              </div>
              <motion.h3
                className="font-medium leading-none mb-2 group-hover:text-primary transition-colors"
                layoutId={`title-${plan.id}`}
              >
                {plan.name}
              </motion.h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {plan.description}
              </p>
            </div>
          </div>

          <motion.div
            className="flex items-center space-x-3 pt-3 border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={plan.creator.avatar} />
                <AvatarFallback>{plan.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>
            <span className="text-sm text-muted-foreground flex-1 truncate">
              {plan.creator.name}
            </span>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {plan.subscriberCount}
              </span>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="pt-0 flex-1 flex flex-col justify-end">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-baseline space-x-1">
              <motion.span
                className="text-lg font-semibold text-primary"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {plan.price}
              </motion.span>
              <span className="text-sm text-muted-foreground">
                /{plan.period}
              </span>
            </div>

            {showSubscribeButton ? (
              <div className="flex space-x-2 flex-wrap gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="transition-all duration-200"
                  >
                    <Link to={`/plan/${plan.id}`}>View</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="group/btn transition-all duration-200"
                >
                  <Link to={`/plan/${plan.id}`}>
                    View Details
                    <motion.div
                      className="ml-1"
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

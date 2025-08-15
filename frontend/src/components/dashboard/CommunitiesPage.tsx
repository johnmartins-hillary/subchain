/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CommunityDetailPage } from "./CommunityDetailPage";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { REGISTRY_ID } from "../../constants";

interface Community {
  id: string;
  hub_id: number;
  name: string;
  image: string;
  fundingGoal: number;
  currentFunding: number;
  status: "Active" | "Funded" | "Pending";
  location: string;
  population: number;
  established: string;
  description: string;
  voteCount: number;
  community_image: string;
}

export function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const client = new SuiClient({ url: getFullnodeUrl("testnet") });

  useEffect(() => {
    const fetchVotedHubs = async () => {
      try {
        const registry: any = await client.getObject({
          id: REGISTRY_ID,
          options: { showContent: true },
        });

        const fields = registry.data?.content?.fields;
        if (!fields?.hubs) {
          console.warn("No hubs in registry");
          return;
        }

        // Map and filter voted hubs
        const hubs: Community[] = fields.hubs
          .map((hub: any) => {
            const f = hub.fields;
            return {
              id: f.id.id,
              hub_id: f.hub_id,
              image: f.community_image
                ? new TextDecoder().decode(new Uint8Array(f.community_image))
                : "",
              fundingGoal: Number(f.funding_goal),
              currentFunding: Number(f.funds_raised),
              status: "Active", // could map from f.status
              location: new TextDecoder().decode(new Uint8Array(f.city)),
              population: 0,
              established: "—",
              description: "A community hub voted by members",
              voteCount: Number(f.vote_count),
            };
          })
          .filter((hub: any) => hub.voteCount > 0);

        setCommunities(hubs);
      } catch (error) {
        console.error("Error fetching voted hubs:", error);
      }
    };

    fetchVotedHubs();
  }, []);

  const handleFund = (communityId: string, amount?: number) => {
    if (amount) {
      setCommunities((prev) =>
        prev.map((community) =>
          community.id === communityId
            ? {
                ...community,
                currentFunding: community.currentFunding + amount,
              }
            : community
        )
      );
      setSelectedCommunity(null);
    } else {
      const community = communities.find((c) => c.id === communityId);
      if (community) {
        setSelectedCommunity(community);
      }
    }
  };

  const getProgressPercentage = (current: number, goal: number) =>
    goal > 0 ? Math.round((current / goal) * 100) : 0;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  if (selectedCommunity) {
    return (
      <CommunityDetailPage
        community={selectedCommunity}
        onBack={() => setSelectedCommunity(null)}
      />
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2">Fund a Voted Community</h1>
          <p className="text-gray-600">
            Support hubs that have already been voted for by the community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {communities.map((community, index) => {
            const progressPercentage = getProgressPercentage(
              community.currentFunding,
              community.fundingGoal
            );

            return (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src={community.image}
                      alt={`${community.name} community`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#FFC404] text-black px-2 py-1 rounded-full text-xs font-medium">
                        {community.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Goal</span>
                        {formatCurrency(community.fundingGoal)}
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Raised</span>
                        <span className="text-sm font-medium text-yellow-600">
                          {formatCurrency(community.currentFunding)}
                        </span>
                      </div>

                      <Progress
                        value={progressPercentage}
                        className="h-2 mb-2"
                      />
                      <div className="text-right text-xs text-gray-500">
                        {progressPercentage}% funded
                      </div>
                    </div>

                    <Button
                      onClick={() => handleFund(community.id)}
                      className="w-full bg-[#000] hover:bg-yellow-500 text-white font-medium"
                      disabled={progressPercentage >= 100}
                    >
                      {progressPercentage >= 100 ? "Fully Funded" : "Fund"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { toast } from "sonner";

export function CreateCommunityPage() {
  const [formData, setFormData] = useState({
    leaderName: "",
    communityName: "",
    city: "",
    establishedNumber: "",
    stateRegion: "",
    longitude: "",
    latitude: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    const requiredFields = Object.values(formData);
    if (requiredFields.some((field) => !field.trim())) {
      toast.error("Please fill in all fields");
      return;
    }

    // In a real app, this would submit to an API
    toast.success("Community created successfully!");

    // Reset form
    setFormData({
      leaderName: "",
      communityName: "",
      city: "",
      establishedNumber: "",
      stateRegion: "",
      longitude: "",
      latitude: "",
    });
  };

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-medium mb-6">Communities</h1>

        <Card className="p-6 border-2 border-blue-200 bg-blue-50/30">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-blue-700 mb-2">
              Create a Community
            </h2>
            <p className="text-sm text-gray-600">
              Add a new solar-powered community to our network. Share your
              community's details to help connect with potential investors and
              solar energy supporters.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="leaderName">Community Leader Name</Label>
              <Input
                id="leaderName"
                type="text"
                value={formData.leaderName}
                onChange={(e) =>
                  handleInputChange("leaderName", e.target.value)
                }
                placeholder="Enter leader name"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="communityName">Community Name</Label>
              <Input
                id="communityName"
                type="text"
                value={formData.communityName}
                onChange={(e) =>
                  handleInputChange("communityName", e.target.value)
                }
                placeholder="Enter community name"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Enter city"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="establishedNumber">Established Number</Label>
              <Input
                id="establishedNumber"
                type="number"
                value={formData.establishedNumber}
                onChange={(e) =>
                  handleInputChange("establishedNumber", e.target.value)
                }
                placeholder="Enter year established"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateRegion">State/Region</Label>
              <Input
                id="stateRegion"
                type="text"
                value={formData.stateRegion}
                onChange={(e) =>
                  handleInputChange("stateRegion", e.target.value)
                }
                placeholder="Enter state or region"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => handleInputChange("latitude", e.target.value)}
                placeholder="Enter latitude"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => handleInputChange("longitude", e.target.value)}
                placeholder="Enter longitude"
                className="w-full"
                required
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <Button
                type="submit"
                className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg"
              >
                Create Community
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

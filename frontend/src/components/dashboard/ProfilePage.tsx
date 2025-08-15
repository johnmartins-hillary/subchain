import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { User, Camera, MapPin, Calendar, Award } from "lucide-react";
import { toast } from "sonner";

export function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    location: "Lagos, Nigeria",
    memberSince: "January 2024",
    totalVotes: 12,
    totalFunding: 2500,
    communitiesSupported: 5,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const achievements = [
    {
      title: "First Vote",
      description: "Cast your first community vote",
      completed: true,
    },
    {
      title: "Community Supporter",
      description: "Fund 3 different communities",
      completed: true,
    },
    {
      title: "Solar Champion",
      description: "Contribute $1000+ in funding",
      completed: true,
    },
    {
      title: "Advocate",
      description: "Vote for 10+ communities",
      completed: true,
    },
    {
      title: "Community Builder",
      description: "Create your first community",
      completed: false,
    },
  ];

  const recentActivity = [
    {
      action: "Voted for",
      community: "Kiribati Village, Nigeria",
      date: "2 days ago",
      type: "vote",
    },
    {
      action: "Funded",
      community: "Kumasi Community",
      date: "1 week ago",
      type: "funding",
      amount: "$250",
    },
    {
      action: "Voted for",
      community: "Achimota Valley, Ghana",
      date: "2 weeks ago",
      type: "vote",
    },
    {
      action: "Funded",
      community: "Akro Community",
      date: "3 weeks ago",
      type: "funding",
      amount: "$500",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-medium mb-6">Profile</h1>

        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-[#FFC404] rounded-full flex items-center justify-center">
                <User size={40} className="text-black" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center">
                <Camera size={16} />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-medium mb-2">
                {profile.firstName} {profile.lastName}
              </h2>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Member since {profile.memberSince}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-lg font-medium text-yellow-600">
                    {profile.totalVotes}
                  </div>
                  <div className="text-xs text-gray-500">Total Votes</div>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <div className="text-lg font-medium text-yellow-600">
                    ${profile.totalFunding}
                  </div>
                  <div className="text-xs text-gray-500">Total Funding</div>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <div className="text-lg font-medium text-yellow-600">
                    {profile.communitiesSupported}
                  </div>
                  <div className="text-xs text-gray-500">Communities</div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
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

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label>Name</Label>
                  <p className="text-sm text-gray-600">
                    {profile.firstName} {profile.lastName}
                  </p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="text-sm text-gray-600">{profile.location}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Award size={20} className="text-yellow-600" />
              Achievements
            </h3>

            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      achievement.completed ? "bg-[#FFC404]" : "bg-gray-300"
                    }`}
                  />
                  <div className="flex-1">
                    <div
                      className={`text-sm font-medium ${
                        achievement.completed
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {achievement.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {achievement.description}
                    </div>
                  </div>
                  {achievement.completed && (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      Completed
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "vote" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    {activity.type === "vote" ? "🗳️" : "💰"}
                  </div>
                  <div>
                    <div className="text-sm">
                      <span className="font-medium">{activity.action}</span>{" "}
                      <span className="text-yellow-600">
                        {activity.community}
                      </span>
                      {activity.amount && (
                        <span className="font-medium">
                          {" "}
                          ({activity.amount})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{activity.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

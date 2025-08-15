import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
// import signInImage from "figma:asset/e7957d0f842bc1a130756d83cf764147f4bd01af.png";

interface SignInPageProps {
  onSignUp: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

export function SignInPage({ onSignUp, onSuccess }: SignInPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<any>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      // In a real app, authenticate user here
      onSuccess();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-auto md:h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b h-[10vh]">
        <div className="flex items-center justify-between px-6 mx-auto">
          <img src="/assets/Logo.png" alt="" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-auto md:h-[90vh]">
        {/* Left side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 flex items-center justify-center"
        >
          <div className="w-full h-full">
            <img
              src={"/assets/auth-banner.png"}
              alt="Solar panel house illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/2 flex items-center justify-center p-8"
        >
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl font-medium mb-2">Sign in</h1>
              <p className="text-gray-600 text-sm">
                Welcome back to LiteAfrika
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <Input
                  id="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg"
                disabled={!formData.email || !formData.password}
              >
                Sign in
              </Button>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <label htmlFor="rememberMe" className="text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#." className="text-yellow-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <div className="text-center text-sm text-gray-600 pt-4">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={onSignUp}
                  className="text-yellow-500 hover:underline"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

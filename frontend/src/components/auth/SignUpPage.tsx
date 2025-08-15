import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface SignUpPageProps {
  onVerifyEmail: () => void;
  onSignIn: () => void;
  onBack: () => void;
}

export function SignUpPage({ onVerifyEmail, onSignIn }: SignUpPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState<any>(false);
  const [staySignedIn, setStaySignedIn] = useState<any>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.email &&
      formData.password &&
      agreeToTerms
    ) {
      onVerifyEmail();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-auto md:h-screen  overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 h-[10vh] py-4 border-b">
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
              <h1 className="text-2xl font-medium mb-2">Create an Account</h1>
              <p className="text-gray-600 text-sm">
                Join the solar energy revolution
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
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
                disabled={
                  !formData.firstName ||
                  !formData.email ||
                  !formData.password ||
                  !agreeToTerms
                }
              >
                Sign up
              </Button>

              <div className="text-center text-sm text-gray-600">
                <span>Already have an Account? </span>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="text-yellow-500 hover:underline"
                >
                  Sign in
                </button>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={setAgreeToTerms}
                    className="mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    I Agree With{" "}
                    <span className="text-yellow-500 hover:underline cursor-pointer">
                      Terms
                    </span>{" "}
                    And{" "}
                    <span className="text-yellow-500 hover:underline cursor-pointer">
                      Privacy
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="staySignedIn"
                    checked={staySignedIn}
                    onCheckedChange={setStaySignedIn}
                  />
                  <label
                    htmlFor="staySignedIn"
                    className="text-sm text-gray-600"
                  >
                    Stay signed in (optional)
                  </label>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

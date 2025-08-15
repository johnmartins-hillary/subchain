import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface VerifyEmailPageProps {
  onSignIn: () => void;
  onBack: () => void;
}

export function VerifyEmailPage({ onSignIn, onBack }: VerifyEmailPageProps) {
  const [otpCode, setOtpCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      // In a real app, verify the OTP code here
      onSignIn();
    }
  };

  const handleResendCode = () => {
    // In a real app, resend OTP code here
    console.log("Resending OTP code...");
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
          className="lg:w-1/2  flex items-center justify-center"
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
              <h1 className="text-2xl font-medium mb-2">Verify Email</h1>
              <p className="text-gray-600 text-sm">
                Enter the verification code sent to your email
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otpCode">OTP Code</Label>
                <Input
                  id="otpCode"
                  type="text"
                  value={otpCode}
                  onChange={(e) => {
                    // Only allow numbers and limit to 6 digits
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtpCode(value);
                  }}
                  placeholder="Enter 6-digit code"
                  className="w-full text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg"
                disabled={otpCode.length !== 6}
              >
                Continue
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm text-yellow-500 hover:underline"
                >
                  Resend code
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

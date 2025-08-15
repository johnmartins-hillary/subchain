import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
// import ZkLoginExample from "./auth/ZkLogin";

interface NavigationProps {
  onSignUp: () => void;
  onSignIn: () => void;
  isAuthenticated: boolean;
  onSignOut: () => void;
  onDashboard?: () => void;
}

export function Navigation({
  onSignUp,
  onSignIn,
  isAuthenticated,
  onSignOut,
  onDashboard,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <img src="/assets/Logo.png" alt="" />

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              How it works
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <User size={20} />
                  <span>Welcome back!</span>
                </div>
                {onDashboard && (
                  <Button
                    variant="outline"
                    onClick={onDashboard}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={onSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onSignIn}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Sign In
                </Button>
                <Button
                  onClick={onSignUp}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* <ZkLoginExample /> */}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <div className="py-4 space-y-4">
              <a
                href="#home"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
              >
                How it works
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </a>
              <a
                href="#faq"
                className="block text-gray-700 hover:text-gray-900 transition-colors"
              >
                FAQ
              </a>

              {/* Mobile Auth Buttons */}
              {isAuthenticated ? (
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={20} />
                    <span>Welcome back!</span>
                  </div>
                  {onDashboard && (
                    <Button
                      variant="outline"
                      onClick={onDashboard}
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={onSignOut}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={onSignIn}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={onSignUp}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

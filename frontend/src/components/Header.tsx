import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Wallet, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Browse Plans", href: "/plans" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Creator", href: "/creator" },
    { name: "Profile", href: "/profile" },
  ];

  const connectWallet = () => {
    // Mock wallet connection
    setIsWalletConnected(true);
  };

  return (
    <motion.header
      className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold text-sm">SC</span>
              </motion.div>
              <span className="font-bold text-lg">SubChain</span>
              <Badge
                variant="secondary"
                className="text-xs hidden sm:inline-flex"
              >
                Beta
              </Badge>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={`text-sm transition-colors hover:text-primary relative group ${
                    location.pathname === item.href
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                      location.pathname === item.href ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isWalletConnected ? (
                <motion.div
                  className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <span className="text-sm font-medium hidden sm:inline">
                    0x1234...5678
                  </span>
                  <span className="text-sm font-medium sm:hidden">
                    Connected
                  </span>
                </motion.div>
              ) : (
                <Button
                  onClick={connectWallet}
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-transform"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Connect Wallet</span>
                  <span className="sm:hidden">Connect</span>
                </Button>
              )}
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t bg-white/95 backdrop-blur-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-3 text-sm transition-colors hover:text-primary hover:bg-muted/50 rounded-lg ${
                        location.pathname === item.href
                          ? "text-primary font-medium bg-primary/5"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

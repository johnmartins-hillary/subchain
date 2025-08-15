import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Users,
  Settings,
  LogOut,
  Plus,
  LucideWallet,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import WalletManager from "../auth/WalletManager";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
}

export function DashboardLayout({
  children,
  currentPage,
  onNavigate,
  onSignOut,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "communities", label: "Communities", icon: Users },
    { id: "fund-community", label: "Fund a Community", icon: LucideWallet },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "configurations", label: "Configurations", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <img src="/assets/Logo.png" alt="Logo" className="h-8" />

            {/* Search bar (hidden on small screens) */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Community"
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-[#FFC404] rounded flex items-center justify-center">
                    <span className="text-xs">🔍</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-2">
            <WalletManager />

            <Button
              variant="outline"
              onClick={() => onNavigate("create-communities")}
              className="flex items-center gap-2 hover:bg-yellow-500 hover:text-white"
            >
              <Plus size={16} />
              <span>Create Community</span>
            </Button>
            <Button
              variant="outline"
              onClick={onSignOut}
              className="flex items-center gap-2 hover:bg-yellow-500 hover:text-white"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </Button>

            <div className="flex items-center gap-2">
              <User className="w-8 h-8 bg-gray-200 rounded-full p-1.5" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -250, opacity: 0 }}
          animate={{
            x: sidebarOpen || window.innerWidth >= 768 ? 0 : -250,
            opacity: sidebarOpen || window.innerWidth >= 768 ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`fixed md:static top-0 left-0 z-40 w-64 bg-white border-r border-gray-200 min-h-screen md:min-h-[calc(100vh-73px)] ${
            sidebarOpen ? "block" : "hidden md:block"
          }`}
        >
          <nav className="p-4 flex flex-col h-full">
            {/* Navigation Links */}
            <div className="space-y-2 flex-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-[#FFC404] text-black font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile-only action buttons */}
            <div className="space-y-2 md:hidden border-t border-gray-200 pt-4">
              <WalletManager />
              <Button
                variant="outline"
                onClick={() => {
                  onNavigate("create-communities");
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-2 hover:bg-yellow-500 hover:text-white"
              >
                <Plus size={16} />
                <span>Create Community</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onSignOut();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-2 hover:bg-yellow-500 hover:text-white"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </Button>
            </div>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

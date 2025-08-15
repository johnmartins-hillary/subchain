import React, { motion } from "framer-motion";
import { Card } from "../ui/card";

export function MyFundingPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-medium mb-6">My Funding</h1>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">My Votes</h2>

          {/* Empty state for now - in a real app this would show user's voting history */}
          <div className="text-center py-12 text-gray-500">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-lg mb-2">No votes yet</p>
            <p className="text-sm">
              When you vote for communities, they will appear here
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

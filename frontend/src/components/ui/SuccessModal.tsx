import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  transactionId?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Success",
  message = "Your action was successful!",
  transactionId,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
             <img src="/assets/check.svg" alt="" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {title}
              </h2>
              <p className="text-gray-600 mb-4 text-xl">{message}</p>

              {transactionId && (
                <p className="text-sm text-gray-500 mb-4">
                  Transaction ID:{" "}
                  <span className="font-mono">{transactionId}</span>
                </p>
              )}

              <Button
                onClick={onClose}
                className="bg-yellow-400 hover:bg-yellow-500 text-white text-lg px-24 py-8 rounded-lg"
              >
                Ok
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Card } from "../../ui/card";
import { MODULE_NAME, PACKAGE_ID, REGISTRY_ID } from "../../../constants";
import { Button } from "../../ui/button";

export function FinalizeVotingPage() {
  const [sendingTx, setSendingTx] = useState(false);
  const [winnerHubId, setWinnerHubId] = useState<number | null>(null);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleFinalizeVoting = async () => {
    setSendingTx(true);

    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::finalize_voting`,
        arguments: [tx.object(REGISTRY_ID)],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result: any) => {
            const hubId = result?.events?.[0]?.parsed?.value || null;
            setWinnerHubId(hubId);
            toast.success("Voting finalized successfully!");
            setSendingTx(false);
          },
          onError: (err: any) => {
            console.error(err);
            toast.error("Failed to finalize voting: " + err.message);
            setSendingTx(false);
          },
        }
      );
    } catch (error: any) {
      console.error(error);
      toast.error("Transaction failed: " + error.message);
      setSendingTx(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-medium">Finalize Voting</h2>

          <p className="text-gray-600">
            Click the button below to finalize the voting. Only the owner can do
            this.
          </p>

          <Button
            onClick={handleFinalizeVoting}
            disabled={sendingTx}
            className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg disabled:bg-gray-300 disabled:text-gray-500"
          >
            {sendingTx ? "Finalizing..." : "Finalize Voting"}
          </Button>

          {winnerHubId !== null && (
            <p className="text-sm text-gray-500 mt-2">
              Winner Hub ID: {winnerHubId}
            </p>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { MODULE_NAME, PACKAGE_ID, REGISTRY_ID } from "../../../constants";

export function UpdateCommunityDetails() {
  const [hubId, setHubId] = useState<number>(0);
  const [fundingGoal, setFundingGoal] = useState<number>(0);
  const [communityWallet, setCommunityWallet] = useState<string>("");
  const [sendingTx, setSendingTx] = useState(false);
  const [txId, setTxId] = useState<string | undefined>(undefined);

  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleSubmit = async () => {
    if (hubId < 0 || fundingGoal <= 0 || !communityWallet) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    setSendingTx(true);

    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::set_funding_details`,
        arguments: [
          tx.object(REGISTRY_ID),
          tx.pure.u64(BigInt(hubId)),
          tx.pure.u64(BigInt(fundingGoal)),
          tx.pure.address(communityWallet),
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            setTxId(result?.digest);
            toast.success("Funding details set successfully!");
            setSendingTx(false);
          },
          onError: (err) => {
            console.error(err);
            toast.error("Failed to set funding details: " + err.message);
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
    <div className="space-y-6 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-medium">Set Funding Details</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hub ID</label>
            <Input
              type="number"
              value={hubId}
              onChange={(e) => setHubId(Number(e.target.value))}
              placeholder="Enter Hub ID"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Funding Goal</label>
            <Input
              type="number"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(Number(e.target.value))}
              placeholder="Enter funding goal"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Community Wallet Address
            </label>
            <Input
              type="text"
              value={communityWallet}
              onChange={(e) => setCommunityWallet(e.target.value)}
              placeholder="Enter wallet address"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={sendingTx}
            className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg disabled:bg-gray-300 disabled:text-gray-500"
          >
            {sendingTx ? "Submitting..." : "Set Funding Details"}
          </Button>

          {txId && (
            <p className="text-sm text-gray-500 mt-2">Transaction ID: {txId}</p>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

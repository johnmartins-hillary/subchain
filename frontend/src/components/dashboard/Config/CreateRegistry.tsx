import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { MODULE_NAME, PACKAGE_ID } from "../../../constants";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";

export function CreateRegistryPage() {
  const [minPropose, setMinPropose] = useState<number>(0);
  const [minVote, setMinVote] = useState<number>(0);
  const [sendingTx, setSendingTx] = useState(false);
  const [txId, setTxId] = useState<string | undefined>(undefined);

  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleCreateRegistry = async () => {
    if (minPropose <= 0 || minVote <= 0) {
      toast.error("Please enter valid minimum tokens for proposing and voting");
      return;
    }

    setSendingTx(true);

    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::new_registry`,
        arguments: [
          tx.pure.u64(BigInt(minPropose)),
          tx.pure.u64(BigInt(minVote)),
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            setTxId(result?.digest);
            toast.success("Registry created successfully!");
            setSendingTx(false);
          },
          onError: (err: any) => {
            console.error(err);
            toast.error("Failed to create registry: " + err.message);
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
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          Back
        </Button>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-medium">Create New Registry</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Minimum Tokens to Propose
            </label>
            <Input
              type="number"
              value={minPropose}
              onChange={(e) => setMinPropose(Number(e.target.value))}
              placeholder="Enter min tokens to propose"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Minimum Tokens to Vote
            </label>
            <Input
              type="number"
              value={minVote}
              onChange={(e) => setMinVote(Number(e.target.value))}
              placeholder="Enter min tokens to vote"
            />
          </div>

          <Button
            onClick={handleCreateRegistry}
            disabled={sendingTx}
            className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg disabled:bg-gray-300 disabled:text-gray-500"
          >
            {sendingTx ? "Creating..." : "Create Registry"}
          </Button>

          {txId && (
            <p className="text-sm text-gray-500 mt-2">Transaction ID: {txId}</p>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

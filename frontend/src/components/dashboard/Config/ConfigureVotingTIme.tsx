import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { toast } from "sonner";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { PACKAGE_ID, MODULE_NAME, REGISTRY_ID } from "../../../constants";
import { SuccessModal } from "../../ui/SuccessModal";

export function SetGlobalVotingPage() {
  const [votingStart, setVotingStart] = useState<string>("");
  const [votingEnd, setVotingEnd] = useState<string>("");
  const [sendingTx, setSendingTx] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [txId, setTxId] = useState<string | undefined>(undefined);

  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleSubmit = async () => {
    if (!votingStart || !votingEnd) {
      toast.error("Please select both start and end times");
      return;
    }

    if (votingStart >= votingEnd) {
      toast.error("Voting start must be before voting end");
      return;
    }

    setSendingTx(true);

    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::set_global_voting_window`,
        arguments: [
          tx.object(REGISTRY_ID),
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result: any) => {
            setTxId(result?.digest);
            setSuccessModalOpen(true);
            setVotingStart("");
            setVotingEnd("");
            setSendingTx(false);
          },
          onError: (err: any) => {
            console.error(err);
            toast.error("Failed to set voting window: " + err.message);
            setSendingTx(false);
          },
        }
      );
    } catch (err: any) {
      toast.error("Transaction failed: " + err.message);
      setSendingTx(false);
    }
  };

  return (
    <div className=" mx-auto mt-10">
      <Card className="p-6 space-y-4">
        <h1 className="text-2xl font-medium">Set Global Voting Window</h1>

        <div className="space-y-3">
          <label className="block text-gray-700 font-medium">
            Voting Start
          </label>
          <input
            type="number"
            value={votingStart}
            onChange={(e) => setVotingStart(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-gray-700 font-medium">Voting End</label>
          <input
            type="number"
            value={votingEnd}
            onChange={(e) => setVotingEnd(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={sendingTx}
          className="w-full bg-[#FFC404] hover:bg-yellow-500 text-black font-medium py-3 rounded-lg disabled:bg-gray-300 disabled:text-gray-500"
        >
          {sendingTx ? "Submitting..." : "Set Voting Window"}
        </Button>
      </Card>

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Voting Window Updated!"
        message={`Global voting window has been successfully updated.`}
        transactionId={txId}
      />
    </div>
  );
}

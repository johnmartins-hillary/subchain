import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Transaction } from "@mysten/sui/transactions";
import { MODULE_NAME, PACKAGE_ID, REGISTRY_ID } from "../../constants";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { SuccessModal } from "../ui/SuccessModal";

const client = new SuiClient({ url: getFullnodeUrl("testnet") });

const DUMMY_IMAGE_URL = "https://placehold.co/200x120?text=Hub+Image";

// --- Helpers ---
function decodeVecU8(arr: number[] | undefined) {
  if (!arr || !Array.isArray(arr)) return "";
  try {
    return new TextDecoder().decode(new Uint8Array(arr));
  } catch {
    return "";
  }
}

function safeNumber(val: string | number | undefined, scale = 1) {
  if (val == null) return 0;
  const num = Number(val);
  return isNaN(num) ? 0 : num / scale;
}

function hasVoted(voters: string[] | undefined, address: string | undefined) {
  if (!voters || !address) return false;
  return voters.some((v) => v.toLowerCase() === address.toLowerCase());
}

// --- Component ---
export function VoteCommunityPage() {
  const [hubs, setHubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const account: any = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchHubs() {
      try {
        const registry: any = await client.getObject({
          id: REGISTRY_ID,
          options: { showContent: true },
        });

        const fields: any = registry.data?.content?.fields;
        if (!fields?.hubs) {
          toast.error("No hubs found in registry");
          setLoading(false);
          return;
        }

        const hubsWithVoters = await Promise.all(
          fields.hubs.map(async (hub: any) => {
            return {
              ...hub,
              voters: hub.fields?.voters || [],
            };
          })
        );

        setHubs(hubsWithVoters);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch communities");
      } finally {
        setLoading(false);
      }
    }

    fetchHubs();
  }, []);

  async function getCallerTokenBalance(address: string, coinType: string) {
    const coins = await client.getCoins({ owner: address, coinType });
    return coins.data.reduce(
      (sum, coin) => sum + BigInt(coin.balance),
      BigInt(0)
    );
  }

  const handleVote = async (hubId: number) => {
    try {
      const callerTokenBalance = await getCallerTokenBalance(
        account.address,
        "0x5c28ffccbaa739ecaae7cfddeffe15b8cbc09d3e4248e0b987b4f6bb1608cd2f::lit_token::LIT_TOKEN"
      );

      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::vote_for_hub`,
        arguments: [
          tx.object(REGISTRY_ID),
          tx.pure.u64(BigInt(hubId)),
          tx.pure.u64(callerTokenBalance),
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            toast.success(`Thank you for voting!`);
            setTransactionId(result?.digest);
            setIsSuccessModalOpen(true);
          },
          onError: (err) => {
            toast.error("Failed to vote: " + err.message);
          },
        }
      );
    } catch (error) {
      toast.error("Error sending vote transaction");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading hubs...</p>;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2">Vote for a Community</h1>
          <p className="text-gray-600">
            Help decide which communities should receive funding next by casting
            your vote!
          </p>
        </div>

        <div className="space-y-4">
          {hubs.map((hub: any, index) => (
            <motion.div
              key={hub.fields?.hub_id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-80 h-48 md:h-auto">
                    <ImageWithFallback
                      src={
                        hub.fields.community_image
                          ? new TextDecoder().decode(
                              new Uint8Array(hub.fields.community_image)
                            )
                          : DUMMY_IMAGE_URL
                      }
                      alt={decodeVecU8(hub.fields?.name)}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between h-full">
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="text-lg font-medium mb-2">
                          {decodeVecU8(hub.fields?.name) || "Unnamed"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          <span className="block">
                            <strong>City:</strong>{" "}
                            {decodeVecU8(hub.fields?.city) || "Unknown"}
                          </span>
                          <span className="block">
                            <strong>Contact:</strong>{" "}
                            {decodeVecU8(hub.fields?.contact) || "Unknown"}
                          </span>
                          <span className="block">
                            <strong>Latitude:</strong>{" "}
                            {safeNumber(hub.fields?.latitude, 1e6)}
                          </span>
                          <span className="block">
                            <strong>Longitude:</strong>{" "}
                            {safeNumber(hub.fields?.longitude, 1e6)}
                          </span>
                        </p>
                        <div className="text-sm text-gray-500">
                          {hub.fields?.vote_count
                            ? Number(hub.fields.vote_count).toLocaleString()
                            : "0"}{" "}
                          votes
                        </div>
                      </div>

                      <div className="md:ml-6">
                        <Button
                          onClick={() => handleVote(Number(hub.fields?.hub_id))}
                          disabled={hasVoted(hub.voters, account?.address)}
                          className={`px-8 py-2 rounded-md font-medium transition-colors ${
                            hasVoted(hub.voters, account?.address)
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-[#FFC404] hover:bg-yellow-500 text-black"
                          }`}
                        >
                          {hasVoted(hub.voters, account?.address)
                            ? "Voted"
                            : "Vote"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Vote Successful!"
        message="Your vote has been submitted successfully."
        transactionId={transactionId}
      />
    </div>
  );
}

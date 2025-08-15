import React from "react";
import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
} from "@mysten/dapp-kit";

// helper function to shorten the address
function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletManager() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  return (
    <div className="flex items-center gap-4">
      {!account ? (
        <ConnectButton
          connectText="Connect Wallet"
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
        />
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">
            {formatAddress(account.address)}
          </span>
          <button
            onClick={() => disconnect()}
            className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

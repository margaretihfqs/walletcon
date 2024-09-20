"use client";

import React, { ReactNode, useState } from "react";
import { config, projectId } from "../config/walletConnectConfig";
import { createContext } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

export const ContractContext = createContext("");

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const [tokenContractAddress, setTokenContractAddress] = useState("");
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <ContractContext.Provider
          value={{tokenContractAddress, setTokenContractAddress}}
        >
          {children}
        </ContractContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

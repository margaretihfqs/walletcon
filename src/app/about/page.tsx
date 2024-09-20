"use client";
import { useConnect, useAccount } from "wagmi";
import { sepolia } from "viem/chains";
import Navbar from "../components/navbar";

export default function About() {
  const { connectors, connectAsync } = useConnect();
  const {address,isConnected,isDisconnected,status} = useAccount();

  async function handleConnect() {
    const metamaskconnector = connectors.find((c) => c.id == "metaMaskSDK");
    //@ts-ignore
    await connectAsync({ connector: metamaskconnector, chainId: sepolia.id });
  }

  return (
    <div>
      <h1>Connect Page</h1>;
<Navbar/>
      <p>{`address ${address}`}</p>
      <p>{`isConnected ${isConnected}`}</p>
      <p>{`isDisconnected ${isDisconnected}`}</p>
      <p>{`status ${status}`}</p>

    </div>
  );
}

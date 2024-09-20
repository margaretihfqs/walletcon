import React from "react";
import erc20Abi from "../abi/erc20.json";
import { useReadContracts } from "wagmi";
import { formatEther } from "viem";

function ContractDetails({ address, tokenContractAddress, network }) {
  const readContractCommonConfig = {
    abi: erc20Abi.abi,
    address: tokenContractAddress,
    chainId: network,
    account: address,
  };

  const { data } = useReadContracts({
    contracts: [
      {
        ...readContractCommonConfig,
        functionName: "name",
      },
      {
        ...readContractCommonConfig,
        functionName: "symbol",
      },
      {
        ...readContractCommonConfig,
        functionName: "balanceOf",
        args: [address],
      },
    ],
  });
  console.log(data);

  return (
    <div className="flex justify-between border p-2 py-4 border-white rounded-lg w-full">
      <div className="font-semibold text-sm w-[50%] space-y-1">
        <p>Token Name:</p>
        <p>Token Symbol:</p>
        <p>Token Contract:</p>
        <p>Wallet Connected:</p>
        <p>Wallet Balance</p>
        <p></p>
      </div>
      {data && (
        <div className="text-sm font-semibold w-[50%] space-y-1 text-lime-500">
          <p>{data[0]?.result}</p>
          <p>{data[1]?.result}</p>
          <p>{`${tokenContractAddress.slice(
            0,
            5
          )}... ${tokenContractAddress.slice(-5)}`}</p>
          <p>{`${address.slice(0, 5)}... ${address.slice(-5)}`}</p>{" "}
          <p>{data[2]?.result && formatEther(data[2].result)}</p>
        </div>
      )}
    </div>
  );
}

export default ContractDetails;

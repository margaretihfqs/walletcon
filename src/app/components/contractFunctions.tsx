"use client";

import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";

import { useState } from "react";
import { sepolia, mainnet } from "wagmi/chains";
import MaterialInput from "./materialInput";
import erc20Abi from "../abi/erc20.json";
import { readContract, getAccount } from "@wagmi/core";
import { config } from "../config/walletConnectConfig";
import { formatEther, isAddress, parseEther } from "viem";
import { toast } from "sonner";
import MaterialButton from "./materialButton";
import { Select, Option } from "@material-tailwind/react";
import ContractDetails from "./contractDetails";
import contracts from "../web3Config.json";
const {
  MATIC_CONTRACT_ADDRESS,
  SHIBA_CONTRACT_ADDRESS,
  LINK_CONTRACT_ADDRESS,
  LIDO_CONTRACT_ADDRESS,
  UNISWAP_CONTRACT_ADDRESS,
  DAI_CONTRACT_ADDRESS,
  NETWORK
} = contracts;
console.log(LINK_CONTRACT_ADDRESS);
let tokenContractAddress: `0x${string}` =
  MATIC_CONTRACT_ADDRESS as `0x${string}`;
export function Approve() {
  const { writeContractAsync, data, failureReason, isPending } =
    useWriteContract();
  const { address } = useAccount();
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState(0);
  async function execute() {
    if (!address) {
      toast.info("Please connect wallet first");
      return;
    }
    try {
      await writeContractAsync({
        abi: erc20Abi.abi,
        address: tokenContractAddress,
        functionName: "approve",
        chainId: NETWORK,
        args: [spender, parseEther(amount.toString())],
        account: address,
      });
      toast.success("Success");
    } catch (error) {
      if (error?.shortMessage) {
        toast.error(error?.shortMessage);
      } else if (failureReason?.message) {
        toast.error(failureReason?.message);
      } else {
        console.log(error);
        toast("An error has occured");
      }
    }
  }
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <p className="text-sm font-semibold"> Approve Tokens </p>
      <MaterialInput
        label={"Spender Address"}
        onChange={(e) => {
          setSpender(e.target.value);
        }}
      />
      <MaterialInput
        label={"Amount"}
        type={"number"}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <MaterialButton
        onClick={() => {
          execute();
        }}
        loading={isPending}
      >
        {isPending ? "Working" : "Approve Tokens"}
      </MaterialButton>
      {data && (
        <div className="text-xs font-semibold">
          <p>
            Transaction Signature:{" "}
            <span className="text-deep-purple-400 break-all">{data}</span>
          </p>
          <p>
            Transaction details:
            <a
              className="text-deep-purple-400 hover:text-deep-purple-200"
              href={`https://sepolia.etherscan.io/tx/${data}`}
              target="_blank"
            >
              Click to view transaction.
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export function Transfer() {
  const { writeContractAsync, failureReason, data, isPending } =
    useWriteContract();
  const { address } = useAccount();
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);
  async function execute() {
    try {
      if (!address) {
        toast.info("Please connect wallet first");
        return;
      }
      const balance = await readContract(config, {
        abi: erc20Abi.abi,
        address: tokenContractAddress,
        functionName: "balanceOf",
        chainId: NETWORK,
        args: [address],
        account: address,
      });
      if (formatEther(balance) < amount.toString()) {
        toast.error(
          `Insufficent Token balance, have ${formatEther(
            balance
          )} but requested ${amount}`
        );
        return;
      }
      await writeContractAsync({
        abi: erc20Abi.abi,
        address: tokenContractAddress,
        functionName: "transfer",
        chainId: NETWORK,
        args: [receiver, parseEther(amount.toString())],
        account: address,
      });
      toast.success("Success");
    } catch (error) {
      if (error?.shortMessage) {
        toast.error(error?.shortMessage);
      } else if (failureReason?.message) {
        toast.error(failureReason?.message);
      } else {
        console.log(error);
        toast("An error has occured");
      }
    }
    1231313131;
  }
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <p className="text-sm font-semibold"> Transfer Tokens </p>
      <MaterialInput
        label={"Receiver Address"}
        onChange={(e) => {
          setReceiver(e.target.value);
        }}
      />
      <MaterialInput
        label={"Amount"}
        type={"number"}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <MaterialButton
        onClick={() => {
          execute();
        }}
        loading={isPending}
      >
        {isPending ? "Working" : "Transfer Tokens"}
      </MaterialButton>
      {data && (
        <div className="text-xs font-semibold">
          <p>
            Transaction Signature:{" "}
            <span className="text-deep-purple-400 break-all">{data}</span>
          </p>
          <p>
            Transaction details:
            <a
              className="text-deep-purple-400 hover:text-deep-purple-200"
              href={`https://sepolia.etherscan.io/tx/${data}`}
              target="_blank"
            >
              {" "}
              Click to view transaction.
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export function TransferFrom() {
  const { writeContractAsync, failureReason, data, isPending } =
    useWriteContract();
  const { address } = useAccount();
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);
  async function execute() {
    try {
      if (!address) {
        toast.info("Please connect wallet first");
        return;
      }
      await writeContractAsync({
        abi: erc20Abi.abi,
        address: tokenContractAddress,
        functionName: "transferFrom",
        chainId: NETWORK,
        args: [sender, receiver, parseEther(amount.toString())],
        account: address,
      });
      toast.success("Success");
    } catch (error) {
      if (error?.shortMessage) {
        toast.error(error?.shortMessage);
      } else if (failureReason?.message) {
        toast.error(failureReason?.message);
      } else {
        console.log(error);
        toast("An error has occured");
      }
    }
  }
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <p className="text-sm font-semibold"> Transfer From </p>

      <MaterialInput
        label={"Sender"}
        onChange={(e) => {
          setSender(e.target.value);
        }}
      />
      <MaterialInput
        label={"Receiver Address"}
        onChange={(e) => {
          setReceiver(e.target.value);
        }}
      />
      <MaterialInput
        label={"Amount"}
        type={"number"}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <MaterialButton
        onClick={() => {
          execute();
        }}
        loading={isPending}
      >
        {isPending ? "Working" : "Transfer Tokens"}
      </MaterialButton>
      {data && (
        <div className="text-xs font-semibold">
          <p>
            Transaction Signature:
            <span className="text-deep-purple-400 break-all">{data}</span>
          </p>
          <p>
            Transaction details:
            <a
              className="text-deep-purple-400 hover:text-deep-purple-200"
              href={`https://sepolia.etherscan.io/tx/${data}`}
              target="_blank"
            >
              Click to view transaction.
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export function TransferOwnership() {
  const { writeContractAsync, failureReason, data, isPending } =
    useWriteContract();
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState("");
  async function execute() {
    try {
      if (!address) {
        toast.info("Please connect wallet first");
        return;
      }
      await writeContractAsync({
        abi: erc20Abi.abi,
        address: tokenContractAddress,
        functionName: "transferOwnership",
        chainId: NETWORK,
        args: [walletAddress],
        account: address,
      });
      toast.success("Success");
    } catch (error) {
      if (error?.shortMessage) {
        toast.error(error?.shortMessage);
      } else if (failureReason?.message) {
        toast.error(failureReason?.message);
      } else {
        console.log(error);
        toast("An error has occured");
      }
    }
  }
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <p className="text-sm font-semibold"> Transfer Contract Ownership </p>
      <MaterialInput
        label={"Wallet Address"}
        onChange={(e) => {
          setWalletAddress(e.target.value);
        }}
      />
      <MaterialButton
        onClick={() => {
          execute();
        }}
        loading={isPending}
      >
        {isPending ? "Working" : "Transfer Ownership"}
      </MaterialButton>
      {data && (
        <div className="text-xs font-semibold">
          <p>
            Transaction Signature:{" "}
            <span className="text-deep-purple-400 break-all">{data}</span>
          </p>
          <p>
            Transaction details:
            <a
              className="text-deep-purple-400 hover:text-deep-purple-200"
              href={`https://sepolia.etherscan.io/tx/${data}`}
              target="_blank"
            >
              {" "}
              Click to view transaction.
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export function ReadContract() {
  const [balAddress, setBalAddress] = useState("");
  const [balResult, setbalResult] = useState("");
  const [allowanceAddr, setAllowanceAddr] = useState("");
  const [allowanceResult, setAllowanceResult] = useState("");
  const [symbol, setSymbol] = useState("");
  const { address } = useAccount();
  const [contractAddress, setTokenContractAddress] = useState<`0x${string}`>(
    "0xc821dfad0f5fad2617faa00c0673e505a13db89d"
  );

  tokenContractAddress = contractAddress;

  async function checkBalance() {
    try {
      const result = await readContract(config, {
        abi: erc20Abi.abi,
        address: tokenContractAddress,
        functionName: "balanceOf",
        chainId: NETWORK,
        args: [balAddress],
        account: address,
      });

      const getSymbol = await readContract(config, {
        abi: erc20Abi.abi,
        address: tokenContractAddress,
        functionName: "symbol",
        chainId: NETWORK,
        account: address,
      });
      setSymbol(getSymbol);
      setbalResult(formatEther(result));
    } catch (error) {
      if (error?.shortMessage) {
        toast.error(error?.shortMessage);
      } else if (failureReason?.message) {
        toast.error(failureReason?.message);
      } else {
        console.log(error);
        toast("An error has occured");
      }
    }
  }

  async function checkAllowance() {
    try {
      if (!address) {
        toast.info("Please connect wallet first");
        return;
      }
      const result = await readContract(config, {
        abi: erc20Abi.abi,
        address: tokenContractAddress,
        functionName: "allowance",
        chainId: NETWORK,
        args: [address, allowanceAddr],
        account: address,
      });
      setAllowanceResult(formatEther(result));
    } catch (error) {
      if (error?.shortMessage) {
        toast.error(error?.shortMessage);
      } else if (failureReason?.message) {
        toast.error(failureReason?.message);
      } else {
        console.log(error);
        toast("An error has occured");
      }
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-6 bg-gray-900 text-white p-6">
      <p className="font-semibold text-center mb-8">Read Contract</p>
      <div className="space-y-4 flex flex-col items-center justify-center border-b border-gray-700 mb-8 pb-6">
        <p className="text-sm font-semibold"> Select Contract </p>
        <Select
          color="blue-gray"
          containerProps={{ className: "max-w-lg" }}
          label="Select Contract function"
          onChange={(e) => setTokenContractAddress(e)}
        >
          <Option color="gray" value={MATIC_CONTRACT_ADDRESS}>
            Matic
          </Option>
          <Option color="gray" value={SHIBA_CONTRACT_ADDRESS}>
            Shib
          </Option>
          <Option color="gray" value={LINK_CONTRACT_ADDRESS}>
            Link
          </Option>
          <Option color="gray" value={LIDO_CONTRACT_ADDRESS}>
            Lido
          </Option>
          <Option color="gray" value={UNISWAP_CONTRACT_ADDRESS}>
            Uniswap
          </Option>
          <Option color="gray" value={DAI_CONTRACT_ADDRESS}>
            Dai
          </Option>
        </Select>
        <p className="text-sm font-semibold"> Contract Details </p>
        {address ? (
          <ContractDetails
            address={address}
            tokenContractAddress={tokenContractAddress}
            NETWORK={NETWORK}
          />
        ) : (
          <div>
            <p>Wallet not connected</p>
          </div>
        )}
      </div>
      <div className="space-y-4 flex flex-col items-center justify-center border-b border-gray-700 mb-8 pb-6">
        <p className="text-sm font-semibold"> Check Balance </p>
        <MaterialInput
          label={"Wallet Address"}
          onChange={(e) => {
            setBalAddress(e.target.value);
          }}
        />
        <MaterialButton
          onClick={() => {
            checkBalance();
          }}
        >
          Check Balance
        </MaterialButton>
        {balResult && (
          <p className="font-semibold text-sm py-4">{`Balance: ${balResult} ${symbol}`}</p>
        )}
      </div>

      <div className="space-y-4 flex flex-col items-center justify-center">
        <p className="text-sm font-semibold"> Check Allowance </p>
        <MaterialInput
          label={"Wallet Address"}
          onChange={(e) => {
            setAllowanceAddr(e.target.value);
          }}
        />
        <MaterialButton
          onClick={() => {
            checkAllowance();
          }}
        >
          Check Allowance
        </MaterialButton>
        {allowanceResult && (
          <p className="font-semibold text-sm py-4">{`Tokens allowed: ${allowanceResult}`}</p>
        )}
      </div>
    </div>
  );
}

export function WriteContract() {
  const [selectedComponent, setSelectedComponent] = useState("");
  function RenderSelectedComponent() {
    switch (selectedComponent) {
      case "A":
        return <Transfer />;
      case "B":
        return <TransferFrom />;
      case "C":
        return <Approve />;
      case "D":
        return <TransferOwnership />;
      default:
        return <div></div>;
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-6 bg-gray-900 text-white p-6 flex flex-col items-center ">
      <p className="font-semibold text-center boder-b border-gray-700 mb-4">
        Write Contract
      </p>
      <Select
        color="blue-gray"
        containerProps={{ className: "max-w-lg" }}
        label="Select Contract function"
        onChange={(e) => setSelectedComponent(e)}
      >
        <Option color="gray" value="A">
          Transfer
        </Option>
        <Option color="gray" value="B">
          Transfer From
        </Option>
        <Option color="gray" value="C">
          Approve
        </Option>
        <Option color="gray" value="D">
          Transfer Ownership
        </Option>
      </Select>
      <div className="px-[1px] my-8 border border-gray-700 w-full" />
      {
        <div className="w-full mt-4 pb-8 border-gray-700">
          {RenderSelectedComponent()}
        </div>
      }
    </div>
  );
}

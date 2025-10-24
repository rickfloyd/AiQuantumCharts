// © Quantum Charts DEX – Non-custodial exchange
// File: src/pages/DEX.tsx

import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "../components/ui/button";

export default function DEX() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0.00");
  const [network, setNetwork] = useState<string>("");

  // 🔌 Connect to Exodus or WalletConnect provider
  async function connectWallet() {
    try {
      // TypeScript-safe access to window.ethereum
      const eth = (window as typeof window & { ethereum?: any }).ethereum;
      if (eth) {
        const provider = new ethers.BrowserProvider(eth);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAddress(accounts[0]);
        const net = await provider.getNetwork();
        setNetwork(net.name);
        const bal = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(bal));
      } else {
        alert("Please open Exodus or install a Web3 wallet.");
      }
    } catch (err) {
      console.error("Connection error:", err);
    }
  }

  // 💱 Example token swap (placeholder only)
  async function executeSwap() {
    alert("Smart-contract swap coming soon.\nNon-custodial only!");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold text-pink-500 mb-8 drop-shadow-neon">
        Quantum DEX
      </h1>

      {!address ? (
        <Button
          onClick={connectWallet}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl"
        >
          Connect Exodus / Wallet
        </Button>
      ) : (
        <div className="text-center">
          <p className="mb-3 text-cyan-300">
            Connected Wallet: <span className="text-white">{address}</span>
          </p>
          <p className="mb-1">Network: {network}</p>
          <p className="mb-6">Balance: {balance} ETH</p>

          <Button
            onClick={executeSwap}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl"
          >
            Execute Swap
          </Button>
        </div>
      )}

      <div className="mt-12 text-gray-400 text-sm max-w-xl text-center">
        <p>
          This DEX is fully non-custodial. Trades execute via smart contracts on
          supported blockchains. No broker, no middlemen.
        </p>
      </div>
    </div>
  );
}

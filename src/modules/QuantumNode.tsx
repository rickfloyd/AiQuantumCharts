// © Quantum Charts – Quantum Node Client
// File: src/modules/QuantumNode.tsx

import React, { useEffect, useState } from "react";

interface NodeStatus {
  uptime: number;
  rewards: number;
  hashPower: number;
  lastPing: string;
}

export default function QuantumNode() {
  const [node, setNode] = useState<NodeStatus>({
    uptime: 0,
    rewards: 0,
    hashPower: 0,
    lastPing: new Date().toISOString(),
  });

  // Simulate blockchain node ping
  useEffect(() => {
    const interval = setInterval(() => {
      setNode((prev) => ({
        uptime: prev.uptime + 1,
        rewards: prev.rewards + Math.random() * 0.001,
        hashPower: prev.hashPower + Math.random() * 0.05,
        lastPing: new Date().toISOString(),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold text-purple-500 mb-6">
        🧬 Quantum Node Status
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-[rgba(255,0,255,0.05)] border border-pink-400 rounded-2xl text-center shadow-[0_0_20px_#ff00ff]">
          <h2 className="text-xl text-pink-400 mb-2">Uptime</h2>
          <p className="text-3xl font-bold">{node.uptime} min</p>
        </div>
        <div className="p-6 bg-[rgba(0,255,255,0.05)] border border-cyan-400 rounded-2xl text-center shadow-[0_0_20px_#00ffff]">
          <h2 className="text-xl text-cyan-400 mb-2">Rewards (QNT)</h2>
          <p className="text-3xl font-bold">{node.rewards.toFixed(4)}</p>
        </div>
        <div className="p-6 bg-[rgba(255,255,0,0.05)] border border-yellow-400 rounded-2xl text-center shadow-[0_0_20px_#ffff00]">
          <h2 className="text-xl text-yellow-400 mb-2">Hash Power</h2>
          <p className="text-3xl font-bold">{node.hashPower.toFixed(2)} GH/s</p>
        </div>
      </div>
      <div className="mt-8 text-gray-400">
        <p>Last Ping: {node.lastPing}</p>
        <p>Node synchronized successfully with the Quantum Chain.</p>
      </div>
    </div>
  );
}

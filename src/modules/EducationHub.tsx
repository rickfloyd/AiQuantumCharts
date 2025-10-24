// © Quantum Charts – Education Hub
// File: src/modules/EducationHub.tsx

import React, { useState } from "react";

type Tier = "kids" | "teens" | "young";

export default function EducationHub() {
  const [tier, setTier] = useState<Tier>("kids");

  const tierInfo = {
    kids: {
      title: "💰 Ages 5 – 12 • Money Basics",
      desc: "Fun mini-games teach earning, saving, and crypto concepts in simple language.",
      tasks: ["Play ‘Save the Coins’", "Watch ‘What is Money?’ Video", "Earn XP Tokens for Correct Answers"],
    },
    teens: {
      title: "📊 Ages 13 – 17 • Action Trader",
      desc: "Arcade-style lessons introduce charts, NFTs & smart contracts.",
      tasks: ["Complete ‘Build Your First Portfolio’", "Simulate a Crypto Trade", "Unlock the Market Boss"],
    },
    young: {
      title: "💼 Ages 18 – 21 • Financial Mastery",
      desc: "Investing 101, credit health, and wealth building courses with real examples.",
      tasks: ["Take ‘Avoiding Debt Traps’", "Finish Budget Planner", "Earn Certified Quantum Badge"],
    },
  };

  const { title, desc, tasks } = tierInfo[tier];

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-pink-500 mb-8 drop-shadow-[0_0_10px_#ff00ff]">
        🎓 Quantum Education Hub
      </h1>

      <div className="flex gap-6 mb-10">
        {(["kids","teens","young"] as Tier[]).map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`px-6 py-2 rounded-xl border transition-all duration-300 ${
              tier === t
                ? "bg-gradient-to-r from-pink-500 to-purple-600 border-pink-400 shadow-[0_0_15px_#ff00ff]"
                : "bg-black border-gray-700 hover:border-cyan-400"
            }`}
          >
            {tierInfo[t].title}
          </button>
        ))}
      </div>

      <p className="text-cyan-300 mb-6 max-w-3xl">{desc}</p>

      <ul className="list-disc pl-6 text-lg text-gray-300">
        {tasks.map((task, i) => (
          <li key={i} className="mb-2">{task}</li>
        ))}
      </ul>
    </div>
  );
}

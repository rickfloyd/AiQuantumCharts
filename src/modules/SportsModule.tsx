// © Quantum Charts – Sports Data Integration
// File: src/modules/SportsModule.tsx

import React, { useEffect, useState } from "react";

export default function SportsModule() {
  const [sportsData, setSportsData] = useState<any[]>([]);
  const API_KEY = "0c28b26bd13441dfadf9a5001932be88"; // SportsDataIO Key

  async function loadSports() {
    try {
      const res = await fetch(
        `https://api.sportsdata.io/v4/soccer/scores/json/GamesByDate/2025-JAN-01?key=${API_KEY}`
      );
      const data = await res.json();
      setSportsData(data.slice(0, 10));
    } catch (err) {
      console.error("Sports API error:", err);
    }
  }

  useEffect(() => {
    loadSports();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold text-pink-500 mb-8">
        ⚽ Sports & Live Scores
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {sportsData.map((match, i) => (
          <div
            key={i}
            className="border border-cyan-500 p-4 rounded-xl shadow-[0_0_10px_#00ffff]"
          >
            <h2 className="text-xl text-cyan-400">{match.HomeTeam} vs {match.AwayTeam}</h2>
            <p className="text-gray-300">
              {match.Status} • {match.Day}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

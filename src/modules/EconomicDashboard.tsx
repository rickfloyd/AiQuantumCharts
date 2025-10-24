// © Quantum Charts – Global Economic Dashboard
// File: src/modules/EconomicDashboard.tsx

import React, { useEffect, useState } from "react";

interface EconData {
  country: string;
  indicator: string;
  value: number;
}

export default function EconomicDashboard() {
  const [data, setData] = useState<EconData[]>([]);
  const API_KEY = "15c1607e6037e7369218596a1ccf7765"; // FRED Key

  async function loadEconomics() {
    try {
      const res = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=GDP&api_key=${API_KEY}&file_type=json`
      );
      const json = await res.json();
      setData([{ country: "United States", indicator: "GDP", value: parseFloat(json.observations.pop().value) }]);
    } catch (err) {
      console.error("Economic API error:", err);
    }
  }

  useEffect(() => {
    loadEconomics();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        🌍 Global Economic Dashboard
      </h1>
      <table className="w-full border-collapse border border-cyan-400 text-lg">
        <thead>
          <tr className="bg-[rgba(0,255,255,0.1)] text-cyan-300">
            <th className="border border-cyan-400 p-2">Country</th>
            <th className="border border-cyan-400 p-2">Indicator</th>
            <th className="border border-cyan-400 p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-[rgba(255,0,255,0.1)] transition">
              <td className="border border-cyan-400 p-2">{row.country}</td>
              <td className="border border-cyan-400 p-2">{row.indicator}</td>
              <td className="border border-cyan-400 p-2">{row.value.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

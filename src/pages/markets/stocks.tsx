import React, { useEffect, useState } from "react";
import { fetchFromApi, normalizeMarketData, MarketData } from "@/lib/systemBridge";

export default function Stocks() {
  const [data, setData] = useState<MarketData[]>([]);

  useEffect(() => {
    async function loadData() {
      const result = await fetchFromApi<any[]>("/api/stocks");
      if (result.status === "success") {
        setData(normalizeMarketData(result.data));
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-pink-500 mb-4">📊 Stocks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <div key={idx} className="p-6 border border-pink-400 rounded-2xl shadow-lg bg-black/80 hover:bg-pink-900/20 transition">
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">{item.name}</h2>
            <p className="text-3xl font-bold">{item.price.toFixed(2)}</p>
            <p className={item.change >= 0 ? "text-green-400" : "text-red-400"}>
              {item.change.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

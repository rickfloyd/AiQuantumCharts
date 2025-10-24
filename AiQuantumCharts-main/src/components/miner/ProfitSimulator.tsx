import { useState } from "react";

export default function ProfitSimulator() {
  const [hashrate, setHashrate] = useState(1000);
  const [difficulty, setDifficulty] = useState(500000);
  const [price, setPrice] = useState(160);
  const [reward, setReward] = useState<string | null>(null);

  const calc = () => {
    const est = ((Number(hashrate) / Number(difficulty)) * 24 * Number(price) * 0.01).toFixed(2);
    setReward(est);
  };

  return (
    <div className="p-6 text-neonPink space-y-3">
      <h3 className="text-xl">Profitability Simulator</h3>
      <div className="grid grid-cols-2 gap-2">
        <label>Hashrate (H/s)</label>
        <input
          type="number"
          value={hashrate}
          onChange={(e) => setHashrate(e.target.value)}
          className="bg-black border p-1"
        />
        <label>Network Difficulty</label>
        <input
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-black border p-1"
        />
        <label>Coin Price (USD)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="bg-black border p-1"
        />
      </div>
      <button onClick={calc} className="bg-neonPink px-3 py-1 rounded">Simulate</button>
      {reward && <p className="text-green-400">Estimated daily revenue: ${reward}</p>}
    </div>
  );
}

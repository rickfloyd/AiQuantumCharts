import { useState } from "react";

export default function PoolManager() {
  const [pools, setPools] = useState([
    { url: "pool.minexmr.com:443", latency: 0, active: true },
  ]);
  const [wallet, setWallet] = useState("");

  const addPool = () => setPools([...pools, { url: "", latency: 0, active: false }]);

  return (
    <div className="p-6 text-neonPurple space-y-3">
      <h3 className="text-xl">Mining Pool Manager</h3>
      <input
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Wallet Address"
        className="w-full bg-black border border-neonPurple p-2"
      />
      <div>
        {pools.map((p, i) => (
          <div key={i} className="flex items-center gap-2 mt-2">
            <input
              value={p.url}
              onChange={(e) => {
                const copy = [...pools];
                copy[i].url = e.target.value;
                setPools(copy);
              }}
              className="flex-1 bg-gray-900 p-1"
            />
            <input
              type="checkbox"
              checked={p.active}
              onChange={(e) => {
                const copy = [...pools];
                copy[i].active = e.target.checked;
                setPools(copy);
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={addPool} className="bg-neonPurple px-3 py-1 rounded">
        + Add Pool
      </button>
    </div>
  );
}

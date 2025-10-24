import { useState, useEffect } from "react";
import axios from "axios";

export default function MinerDashboard() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/miner/status");
        setStatus(res.data);
      } catch {
        setStatus({ message: "Bridge not reachable" });
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="p-6 text-neonBlue space-y-3">
      <h2 className="text-2xl">Quantum Node – Miner Dashboard</h2>
      {status ? (
        <div className="bg-gray-900 p-4 rounded">
          <p>Miner: {status.miner}</p>
          <p>Connected: {status.connected ? "Yes" : "No"}</p>
          <p>Hashrate: {status.hashrate}</p>
          <p>{status.message}</p>
        </div>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
}

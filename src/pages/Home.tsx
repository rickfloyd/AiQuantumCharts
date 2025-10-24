import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-6xl font-bold text-pink-500 drop-shadow-[0_0_15px_#ff00ff]">
        Quantum Charts
      </h1>
      <p className="text-cyan-300 text-lg max-w-2xl mt-6">
        A next-generation TradingView-style ecosystem built for real-time data,
        decentralized insight, and educational power.
      </p>
      <div className="flex gap-6 mt-10">
        <Link
          to="/markets"
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-[0_0_15px_#ff00ff]"
        >
          View Markets
        </Link>
        <Link
          to="/about"
          className="px-6 py-3 border border-cyan-400 text-cyan-300 rounded-xl hover:bg-[rgba(0,255,255,0.1)]"
        >
          About Quantum
        </Link>
      </div>
    </div>
  );
}

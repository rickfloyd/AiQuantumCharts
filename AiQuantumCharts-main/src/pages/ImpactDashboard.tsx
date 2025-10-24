import React from "react";

export default function ImpactDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-pink-400 mb-8 drop-shadow-[0_0_10px_#ff00ff]">Impact Dashboard</h1>
      <p className="mb-6 text-lg text-gray-300">Live stats on funds raised, scholarships granted, and student projects. (Demo data below)</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-pink-900/30 border border-pink-400 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-pink-300 mb-2">Funds Raised</h2>
          <p className="text-3xl font-bold">$12,500</p>
        </div>
        <div className="bg-cyan-900/30 border border-cyan-400 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-cyan-300 mb-2">Scholarships</h2>
          <p className="text-3xl font-bold">18</p>
        </div>
        <div className="bg-yellow-900/30 border border-yellow-400 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-300 mb-2">Student Projects</h2>
          <p className="text-3xl font-bold">7</p>
        </div>
      </div>
    </div>
  );
}

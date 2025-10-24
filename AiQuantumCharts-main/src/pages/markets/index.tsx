import React, { useState } from "react";

const usSports = [
  "American Football",
  "Basketball",
  "Baseball",
  "Ice Hockey"
];

const worldSports = [
  "Soccer (Football)",
  "American Football",
  "Basketball",
  "Cricket",
  "Formula 1",
  "Baseball",
  "Tennis",
  "Boxing / MMA",
  "Ice Hockey"
];

export default function MarketsOverview() {
  const [tab, setTab] = useState<'us' | 'world'>('us');
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">📈 Markets Overview</h1>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-t bg-cyan-800 text-white font-semibold border-b-2 ${tab === 'us' ? 'border-cyan-400' : 'border-transparent opacity-70'}`}
          onClick={() => setTab('us')}
        >
          US Sports
        </button>
        <button
          className={`px-4 py-2 rounded-t bg-cyan-800 text-white font-semibold border-b-2 ${tab === 'world' ? 'border-cyan-400' : 'border-transparent opacity-70'}`}
          onClick={() => setTab('world')}
        >
          World Sports
        </button>
      </div>
      <div className="bg-gray-900 rounded-b p-6 shadow-lg">
        {tab === 'us' && (
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 mb-2">US Sports</h2>
            <ul className="list-disc list-inside text-lg">
              {usSports.map(sport => (
                <li key={sport}>{sport}</li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'world' && (
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 mb-2">World Sports</h2>
            <ul className="list-disc list-inside text-lg">
              {worldSports.map(sport => (
                <li key={sport}>{sport}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

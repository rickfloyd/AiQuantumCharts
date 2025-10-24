import React from "react";

// Open Knowledge Graph: explorable, AI-queriable (demo)
const nodes = [
  { id: 1, label: "Chart: BTC/USD" },
  { id: 2, label: "Strategy: RSI Divergence" },
  { id: 3, label: "Lesson: Moving Averages" },
  { id: 4, label: "User: Alice" },
  { id: 5, label: "Indicator: MACD" }
];
const edges = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 4, to: 1 },
  { from: 1, to: 5 }
];

export const KnowledgeGraph: React.FC = () => (
  <div className="my-8 flex flex-col items-center">
    <h2 className="text-2xl font-bold text-blue-400 mb-2">Open Knowledge Graph</h2>
    <div className="bg-black/80 border border-blue-400 rounded-xl p-6 w-full max-w-2xl text-blue-200">
      <div className="mb-2">(Demo) Explore relationships between charts, strategies, lessons, and users:</div>
      <ul className="mb-2">
        {nodes.map(n => (
          <li key={n.id} className="mb-1">{n.label}</li>
        ))}
      </ul>
      <div className="text-xs text-blue-300">Edges: {edges.map(e => `${e.from}→${e.to}`).join(", ")}</div>
      <div className="mt-4 text-blue-300">AI: "Ask me how any node is related!"</div>
    </div>
  </div>
);

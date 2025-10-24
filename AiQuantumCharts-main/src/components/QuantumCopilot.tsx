import React, { useState } from "react";
import styles from "./QuantumCopilot.module.css";

// Quantum AI Copilot: context-aware, proactive assistant
export const QuantumCopilot: React.FC = () => {
  const [suggestion, setSuggestion] = useState("Analyzing your chart and activity...");
  // TODO: Connect to backend for real AI

  // Simulate proactive suggestion
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSuggestion("Would you like to see a volatility analysis or try a new trading strategy?");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-24 right-4 w-96 bg-gradient-to-br from-cyan-900/90 to-pink-900/90 border border-cyan-400 rounded-xl shadow-lg z-50 flex flex-col">
      <div className="p-3 border-b border-cyan-400 font-bold text-cyan-300 flex items-center gap-2">
        <span>🧠 Quantum Copilot</span>
        <span className="text-xs bg-cyan-700 text-white px-2 py-0.5 rounded">Beta</span>
      </div>
  <div className={`flex-1 p-3 text-cyan-200 ${styles.copilotSuggestion}`}>{suggestion}</div>
      <div className="flex border-t border-cyan-400">
        <button className="flex-1 px-4 py-2 text-cyan-400 font-bold hover:bg-cyan-800" onClick={() => setSuggestion("[AI: Volatility analysis coming soon]")}>Volatility</button>
        <button className="flex-1 px-4 py-2 text-pink-400 font-bold hover:bg-pink-800" onClick={() => setSuggestion("[AI: New strategy suggestion coming soon]")}>New Strategy</button>
      </div>
    </div>
  );
};

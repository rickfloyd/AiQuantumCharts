import React from "react";

export const DualModeToggle: React.FC<{ mode: 'quantum' | 'classic'; setMode: (m: 'quantum' | 'classic') => void }> = ({ mode, setMode }) => (
  <div className="fixed bottom-4 left-4 z-50 flex gap-2">
    <button
      className={`px-4 py-2 rounded-lg font-bold text-xs ${mode === 'quantum' ? 'bg-pink-600 text-white' : 'bg-gray-900 text-pink-400 border border-pink-500'} transition-all`}
      onClick={() => setMode('quantum')}
    >
      Quantum Mode
    </button>
    <button
      className={`px-4 py-2 rounded-lg font-bold text-xs ${mode === 'classic' ? 'bg-cyan-600 text-white' : 'bg-gray-900 text-cyan-400 border border-cyan-500'} transition-all`}
      onClick={() => setMode('classic')}
    >
      Classic Mode
    </button>
  </div>
);

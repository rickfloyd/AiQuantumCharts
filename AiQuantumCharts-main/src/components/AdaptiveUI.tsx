import React, { useState } from "react";

// Adaptive UI/UX: morphs based on user behavior/emotion (demo)
export const AdaptiveUI: React.FC = () => {
  const [mode, setMode] = useState<'focus' | 'relax'>('focus');

  return (
    <div className="my-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-green-400 mb-2">Adaptive UI/UX</h2>
      <div className="mb-4">
        <button className={`px-6 py-2 rounded-xl mr-2 ${mode === 'focus' ? 'bg-green-700 text-white' : 'bg-gray-800 text-green-300'}`} onClick={() => setMode('focus')}>Focus Mode</button>
        <button className={`px-6 py-2 rounded-xl ${mode === 'relax' ? 'bg-green-700 text-white' : 'bg-gray-800 text-green-300'}`} onClick={() => setMode('relax')}>Relax Mode</button>
      </div>
      <div className={`w-full max-w-xl p-6 rounded-xl border ${mode === 'focus' ? 'border-green-400 bg-black/90' : 'border-green-700 bg-green-900/30'} text-center text-green-200`}>
        {mode === 'focus' ? 'Minimal distractions. High-contrast. Keyboard shortcuts enabled.' : 'Soft colors. Ambient sounds. Gentle animations.'}
      </div>
    </div>
  );
};

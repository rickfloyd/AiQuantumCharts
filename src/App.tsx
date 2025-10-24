
import React, { useState, useEffect } from 'react';
import { initStealthDefense } from './security/StealthDefense';
import NeonTheme from './components/NeonTheme';
import MinimalTheme from './components/MinimalTheme';

function App() {

  useEffect(() => {
    initStealthDefense();
  }, []);

  const [theme, setTheme] = useState<'neon' | 'minimal'>(
    () => (localStorage.getItem('siteTheme') as 'neon' | 'minimal') || 'neon'
  );

  const handleSwitch = () => {
    const next = theme === 'neon' ? 'minimal' : 'neon';
    setTheme(next);
    localStorage.setItem('siteTheme', next);
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleSwitch}
          className="px-4 py-2 rounded-lg font-bold text-xs bg-gray-900 text-cyan-400 border border-cyan-500 shadow-neon-cyan hover:bg-cyan-900 hover:text-white transition-all"
        >
          Switch to {theme === 'neon' ? 'Simple' : 'Neon'} UI
        </button>
      </div>
      {theme === 'neon' ? <NeonTheme /> : <MinimalTheme />}
    </>
  );
}

export default App;

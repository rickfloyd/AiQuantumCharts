
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { initStealthDefense } from './security/StealthDefense';
import NeonTheme from './components/NeonTheme';
import MinimalTheme from './components/MinimalTheme';
// Electron detection utility
function isElectron() {
  if (
    typeof window !== 'undefined' &&
    typeof (window as Window & { process?: { versions?: { electron?: string } } }).process === 'object' &&
    typeof (window as Window & { process?: { versions?: { electron?: string } } }).process?.versions === 'object' &&
    typeof (window as Window & { process?: { versions?: { electron?: string } } }).process?.versions?.electron === 'string'
  ) {
    return true;
  }
  if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
    return true;
  }
  return false;
}

function App() {
  if (!isElectron()) {
    return (
      <div className={styles.electronOnlyWarning}>
        <h1>🚫 Please open AiQuantumCharts in the Electron app.</h1>
        <p>This app is designed to run only in Electron for security and feature reasons.</p>
      </div>
    );
  }

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

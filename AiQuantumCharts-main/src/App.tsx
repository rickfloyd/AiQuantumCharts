import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VRTradingPortal } from './components/VRTradingPortal';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { AdaptiveUI } from './components/AdaptiveUI';
import { LiveCollabRoom } from './components/LiveCollabRoom';
import { AutonomousLearningEngine } from './components/AutonomousLearningEngine';
import { Chart3D } from './components/Chart3D';
import { QuantumCopilot } from './components/QuantumCopilot';
import { SentimentNewsOverlay } from './components/SentimentNewsOverlay';
import { ModularDashboard } from './components/ModularDashboard';
import { DualModeToggle } from './components/DualModeToggle';
import { CollabPresence } from './components/CollabPresence';
import { AIAssistantPanel } from './components/AIAssistantPanel';
import { AccessibilityHelper } from './components/AccessibilityHelper';
import { t } from './i18n';
import { initStealthDefense } from './security/StealthDefense';
import NeonTheme from './components/NeonTheme';
import MinimalTheme from './components/MinimalTheme';

function isElectron() {
  if (
    typeof window !== 'undefined' &&
    (window as any).process &&
    (window as any).process.versions &&
    (window as any).process.versions.electron
  ) {
    return true;
  }
  if (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  ) {
    return true;
  }
  return false;
}

const App: React.FC = () => {
  // Electron-only check before any hooks
  if (!isElectron()) {
    return (
      <div className="electron-only-warning">
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
  const [mode, setMode] = useState<'quantum' | 'classic'>('quantum');
  const handleSwitch = () => {
    const next = theme === 'neon' ? 'minimal' : 'neon';
    setTheme(next);
    localStorage.setItem('siteTheme', next);
  };
  const onlineUsers = ['Alice', 'Bob'];
  const lang = 'en';
  const sentiment = 'Bullish';
  const news = [
    'Fed signals no rate hike this month',
    'BTC breaks $70k, new all-time high',
    'AI stocks lead tech rally',
  ];

  return (
    <Router>
      <Routes>
        <Route path="/vr" element={<VRTradingPortal />} />
        <Route
          path="/*"
          element={
            <>
              <AccessibilityHelper />
              <DualModeToggle mode={mode} setMode={setMode} />
              <div className="fixed top-4 right-4 z-50">
                <button
                  onClick={handleSwitch}
                  className="px-4 py-2 rounded-lg font-bold text-xs bg-gray-900 text-cyan-400 border border-cyan-500 shadow-neon-cyan hover:bg-cyan-900 hover:text-white transition-all"
                >
                  Switch to {theme === 'neon' ? 'Simple' : 'Neon'} UI
                </button>
              </div>
              <div id="main-content">
                <div className="text-center text-lg text-cyan-300 mb-2">{t('welcome', lang)}</div>
                {theme === 'neon' ? <NeonTheme /> : <MinimalTheme />}
                <ModularDashboard mode={mode} theme={theme} />
                <Chart3D />
                <AutonomousLearningEngine />
                <LiveCollabRoom />
                <KnowledgeGraph />
                <AdaptiveUI />
                <AIAssistantPanel />
                <SentimentNewsOverlay sentiment={sentiment} news={news} />
                <QuantumCopilot />
                <CollabPresence users={onlineUsers} />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

// Add this to your main CSS file:
// .electron-only-warning {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background: #111;
//   color: #fff;
// }


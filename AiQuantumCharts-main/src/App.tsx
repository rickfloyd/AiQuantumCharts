import { KnowledgeGraph } from './components/KnowledgeGraph';
import { AdaptiveUI } from './components/AdaptiveUI';
import { LiveCollabRoom } from './components/LiveCollabRoom';
import { AutonomousLearningEngine } from './components/AutonomousLearningEngine';
import { Chart3D } from './components/Chart3D';
import { QuantumCopilot } from './components/QuantumCopilot';
import { SentimentNewsOverlay } from './components/SentimentNewsOverlay';
import { ModularDashboard } from './components/ModularDashboard';
import { DualModeToggle } from './components/DualModeToggle';

import React, { useState, useEffect } from 'react';
import { CollabPresence } from './components/CollabPresence';
import { AIAssistantPanel } from './components/AIAssistantPanel';
import { AccessibilityHelper } from './components/AccessibilityHelper';
import { t } from './i18n';
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
  const [mode, setMode] = useState<'quantum' | 'classic'>('quantum');
  const onlineUsers = ["Alice", "Bob"];
  const lang = 'en';
  const sentiment = 'Bullish';
  const news = [
    'Fed signals no rate hike this month',
    'BTC breaks $70k, new all-time high',
    'AI stocks lead tech rally',
  ];
  return (
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
        <ModularDashboard />
        <Chart3D />
        <AutonomousLearningEngine />
        <LiveCollabRoom />
        <AdaptiveUI />
        <KnowledgeGraph />
      </div>
      <SentimentNewsOverlay sentiment={sentiment} news={news} />
      <CollabPresence users={onlineUsers} />
      <AIAssistantPanel />
      <QuantumCopilot />
    </>
  );
}

export default App;
